import ECInputField from "@/components/module/Form/ECInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";


const formSchema = z.object({
  image: z.string().min(10, "Enter a valid email"),
  title: z.string().min(4, "Enter a valid title"),
  description: z.string().min(4, "Enter a valid description"),
  price: z.number(),
  category: z.string().min(4, "Enter a valid category"),
});

const CreateProduct = () => {
  ;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }


  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Image URL */}
          <ECInputField
            name="image"
            title="image"
            placeholder="image"
            inputType="text"
            control={form.control}
          />

          {/* Title */}
          <div>
            <ECInputField
              name="title"
              title="title"
              placeholder="title"
              inputType="text"
              control={form.control}
            />
          </div>

          {/* Description */}
          <div>
            <ECInputField
              name="description"
              title="description"
              placeholder="description"
              inputType="text"
              control={form.control}
            />
          </div>

          {/* Price */}
          <div>
            <ECInputField
              name="price"
              title="price"
              placeholder="price"
              inputType="number"
              control={form.control}
            />
          </div>

          {/* Category */}
          <div>
            <ECInputField
              name="category"
              title="category"
              placeholder="category"
              inputType="category"
              control={form.control}
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit" 
            >
              Submit Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
