// src/action/Product/useProducts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/API-axios/axiosSecure";
import { useProductService } from "./useProductService";

export type TProduct = {
  _id: string;
  title: string;
  slug: string;
  brand: string;
  basePrice: number;
  discountPrice?: number;
  currency: string;
  shortDescription?: string;
  description?: string;
  category: string[];
  colors: {
    name: string;
    hexCode: string;
    images: { url: string; alt: string }[];
    sizes: { size: string; stock: number; quantitySold: number; sku: string; price: number }[];
  }[];
  userId: string;
};

export const useProducts = () => {
  const productService = useProductService();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // ✅ Create Product
  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // ✅ Get All Products
  const getProductsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // ✅ Delete Product
  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    createProductMutation,
    getProductsQuery,
    deleteProductMutation,
  };
};
