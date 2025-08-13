import useAxiosSecure from "@/API-axios/axiosSecure";

export const useBrandService = () => {
  const axiosSecure = useAxiosSecure();

  const createBrand = async (data: any) => {
    const res = await axiosSecure.post("/brand", data);
    return res;
  };

  const getBrand = async () => {
    const res = await axiosSecure.get("/brand");
    return res;
  };

  const deleteBrand = async (id: string) => {
    return await axiosSecure.delete(`/brand/${id}`);
  };

  return { createBrand, getBrand, deleteBrand };
};
