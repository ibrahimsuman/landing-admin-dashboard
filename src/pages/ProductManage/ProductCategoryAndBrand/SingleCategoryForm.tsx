// SingleCategoryForm.tsx
import { useCategory } from "@/action/category/useCategory";
import ECInputField from "@/components/module/Form/ECInputField";
import { Button } from "@/components/ui/button";
import { hasUppercase } from "@/utils/uppercaseChecker";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const categorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  value: z.string().min(1, "Value is required"),
});

type CategoryForm = z.infer<typeof categorySchema>;

// Add props type
type SingleCategoryFormProps = {
  closeModal?: () => void;
};

const SingleCategoryForm = ({ closeModal }: SingleCategoryFormProps) => { 
  const { createCategoryMutation } = useCategory();
  const { mutate, isPending } = createCategoryMutation;


  const form = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      value: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: CategoryForm) => {
    if (data.title.toLowerCase() !== data.value.toLowerCase()) {
      return toast.error("Title & value must match");
    }
    if (hasUppercase(data.value)) {
      return toast.error("Value must be lowercase");
    }

    mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully");
        form.reset();
        closeModal?.();
      },
      onError: (error: any) => {
        const errMsg = error.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ECInputField
          control={control}
          name="title"
          title="Category title"
          placeholder="e.g. Mobile"
        />

        <ECInputField
          control={control}
          name="value"
          title="Category value"
          placeholder="e.g. mobile"
        />
        {isPending ? (
          <Button type="button" className="w-full cursor-pointer mt-4">
            loading...
          </Button>
        ) : (
          <Button type="submit" className="w-full cursor-pointer mt-4">
            Create Category
          </Button>
        )}
        <p className="text-xs text-muted-foreground text-center">
          Title and value must match Value must be lowercase
        </p>
      </form>
    </FormProvider>
  );
};

export default SingleCategoryForm;
