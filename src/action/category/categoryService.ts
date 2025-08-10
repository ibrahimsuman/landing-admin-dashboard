import useAxiosSecure from "@/API-axios/axiosSecure";

export const useCategoryService = () => {
  const axiosSecure = useAxiosSecure();

  const createCategory = async (data: any) => {
    const res = await axiosSecure.post("/categories", data);
    return res;
  };
  const getCategory = async (data: any) => {
    const res = await axiosSecure.post("/users/all-user", data);
    return res;
  };

  return { createCategory, getCategory };
};
