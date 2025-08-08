import useAxiosSecure from "@/API-axios/axiosSecure";
import ECInputField from "@/components/module/Form/ECInputField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const categorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  value: z.string().min(1, "Value is required"),
});

type CategoryForm = z.infer<typeof categorySchema>;

const SingleCategoryForm = () => {
  const axiosSecure = useAxiosSecure();

  const form = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      value: "",
    },
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: CategoryForm) => {
    try {
      const res = await axiosSecure.post("/categories", data);
      if (res?.data?.success) {
         toast.success("Category create successfully")
        
     }
    } catch (error: any) {
      console.error("Failed to save category", error);
    }
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
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}

        <ECInputField
          control={control}
          name="value"
          title="Category value"
          placeholder="e.g. mobile"
        />
        {errors.value && <p className="text-red-600">{errors.value.message}</p>}

        <Button type="submit" className="w-full cursor-pointer mt-4">
          Save Category
        </Button>
      </form>
    </FormProvider>
  );
};

export default SingleCategoryForm;
