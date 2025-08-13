import { useUser, type TUser } from "@/action/Users/useUser";
import { Button } from "@/components/ui/button";

export default function AllUsersList() {
  const { getAllUsersQuery, deleteUserMutation } = useUser();
  const { data: users, isLoading, isError, error } = getAllUsersQuery;

  console.log("Users API Response:", users);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) {
    console.error("Error fetching users:", error);
    return <p className="text-red-500">Failed to load users.</p>;
  }

  // Make sure your backend actually sends { data: [...] }
  return (
    <div className="space-y-2 w-full max-w-1/2">
      {users?.data?.map((user: TUser) => (
        <div
          key={user._id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteUserMutation.mutate(user._id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
