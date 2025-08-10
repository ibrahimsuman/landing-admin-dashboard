import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCategoryService } from "./categoryService";

export const useCategory = () => {
  const categoryService = useCategoryService();
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const getCategoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: categoryService.getCategory,
  });

  return { createCategoryMutation, getCategoryQuery };
};
