import { useBrand } from "@/action/Brand/useBrand";
import ECInputField from "@/components/module/Form/ECInputField";
import { Button } from "@/components/ui/button";
import { hasUppercase } from "@/utils/uppercaseChecker";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const brandSchema = z.object({
  title: z.string().min(1, "Title is required"),
  value: z.string().min(1, "Value is required"),
});

type BrandForm = z.infer<typeof brandSchema>;

const BrandForm = () => {
  const { createBrandMutation } = useBrand();
  const { mutate, isPending } = createBrandMutation;

  const form = useForm<BrandForm>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      title: "",
      value: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: BrandForm) => {
    if (data.title.toLowerCase() !== data.value.toLowerCase()) {
      return toast.error("Title & value must match");
    }
    if (hasUppercase(data.value)) {
      return toast.error("Value must be lowercase");
    }

    mutate(data, {
      onSuccess: () => {
        toast.success("Brand created successfully");
        form.reset();
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
          title="Brand title"
          placeholder="e.g. Apple"
        />
        <ECInputField
          control={control}
          name="value"
          title="Brand value"
          placeholder="e.g. apple"
        />
        {isPending ? (
          <Button type="button" className="w-full cursor-pointer mt-4">
            loading...
          </Button>
        ) : (
          <Button type="submit" className="w-full cursor-pointer mt-4">
            Create Brand
          </Button>
        )}
        <p className="text-xs text-muted-foreground text-center">
          Title and value must match & must be lowercase
        </p>
      </form>
    </FormProvider>
  );
};

export default BrandForm;
