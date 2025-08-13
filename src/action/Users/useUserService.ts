import useAxiosSecure from "@/API-axios/axiosSecure";

export const useUserService = () => {
  const axiosSecure = useAxiosSecure();

  const getAllUsers = async () => {
    const res = await axiosSecure.post("users/all-user");
    console.log("getAllUsers API Response:", res.data); // Log full API response
    return res.data;
  };

  const deleteUser = async (id: string) => {
    console.log("Deleting user with ID:", id);
    return await axiosSecure.delete(`/users/all-user/${id}`); // fixed path
  };

  return { getAllUsers, deleteUser };
};
