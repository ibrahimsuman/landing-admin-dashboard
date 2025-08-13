import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type DeleteItemDialogProps = {
  itemId: string;
  itemName?: string;
  onDelete: (id: string) => void;
};

export const DeleteItemDialog = ({ itemId, itemName, onDelete }: DeleteItemDialogProps) => {
  const handleConfirm = () => {
    onDelete(itemId);
    toast.success(`${itemName ?? "Item"} deleted successfully`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="cursor-pointer group hover:bg-secondary hover:text-white"
        >
          <Trash size={14} className="transition-colors" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col items-center justify-center text-center">
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <AlertDialogTitle className="text-red-600">
            Are you sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {itemName ?? "this item"}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex items-center justify-center gap-3 mt-4">
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
