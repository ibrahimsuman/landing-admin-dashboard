// src/action/Product/useProductService.ts
import useAxiosSecure from "@/API-axios/axiosSecure";

export const useProductService = () => {
  const axiosSecure = useAxiosSecure();

  const createProduct = async (data: any) => {
    const res = await axiosSecure.post("/products", data);
    return res.data;
  };

  const deleteProduct = async (id: string) => {
    const res = await axiosSecure.delete(`/products/${id}`);
    return res.data;
  };

  return { createProduct, deleteProduct };
};
