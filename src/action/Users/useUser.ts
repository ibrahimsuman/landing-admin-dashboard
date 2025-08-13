import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserService } from "./useUserService";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export const useUser = () => {
  const userService = useUserService();
  const queryClient = useQueryClient();

  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { getAllUsersQuery, deleteUserMutation };
};
