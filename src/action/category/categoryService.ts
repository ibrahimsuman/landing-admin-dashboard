import useAxiosSecure from "@/API-axios/axiosSecure";

export const useCategoryService = () => {
  const axiosSecure = useAxiosSecure();

  const createCategory = async (data: any) => {
    const res = await axiosSecure.post("/categories", data);
    return res;
  };
  const getCategory = async () => {
    const res = await axiosSecure.get("/categories");
    return res;
  };
  const deleteCategory = async (id: string) => {
    return await axiosSecure.delete(`/categories/${id}`);
  };

  return { createCategory, getCategory, deleteCategory };
};
