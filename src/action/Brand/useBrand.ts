import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export type TBrand = {
  _id: string;
  title: string;
  value: string;
};
export const useBrand = () => {
  const createBrandMutation = useMutation({
    mutationFn: async (data: { title: string; value: string }) => {
      const res = await axios.post("/brand", data);
      return res.data;
    },
  });

  const getBrandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get("/brand");
      return res.data;
    },
  });

  return { createBrandMutation, getBrandQuery };
};
