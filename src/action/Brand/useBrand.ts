// src/action/Brand/useBrand.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/API-axios/axiosSecure";
import { useBrandService } from "./useBrandService";

export type TBrand = {
  _id: string;
  title: string;
  value: string;
};

export const useBrand = () => {
  const brandService = useBrandService();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Create Brand
  const createBrandMutation = useMutation({
    mutationFn: brandService.createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });

  // Get Brand List
  const getBrandQuery = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const res = await axiosSecure.get("/brand");
      return res;
    },
  });

  // Delete Brand
  const deleteBrandMutation = useMutation({
    mutationFn: brandService.deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });

  return { createBrandMutation, getBrandQuery, deleteBrandMutation };
};
