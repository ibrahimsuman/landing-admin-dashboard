import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCategoryService } from "./categoryService";
import useAxiosSecure from "@/API-axios/axiosSecure";


export type TCategory = {
  _id: string;
  title: string;
  value: string;
};

export const useCategory = () => {
  const categoryService = useCategoryService();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();


  const createCategoryMutation = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const getCategoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: async () => await axiosSecure.get("/categories")
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return { createCategoryMutation, getCategoryQuery, deleteCategoryMutation };
};
