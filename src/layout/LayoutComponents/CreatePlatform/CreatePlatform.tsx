import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

type ProductFormValues = {
  title: string;
  logo?: FileList;
  favicon?: FileList;
};

const CreatePlatform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    const jsonData = {
      siteName: data.title,
      description: "This is my site",
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(jsonData));

    if (data.logo && data.logo[0]) formData.append("files", data.logo[0]);
    if (data.favicon && data.favicon[0]) formData.append("files", data.favicon[0]);

    const res = await fetch("http://landing.imranexporter.com/api", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log("✅ API Response:", result);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Upgrade to Pro
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 mb-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Input
                placeholder="Business Full Name"
                className="py-2 px-4"
                {...register("title", { required: "Title is required." })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Upload Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Logo
              </label>
              <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition">
                <UploadCloud className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 text-sm">Choose Logo File</span>
                <input type="file" className="hidden" {...register("logo")} />
              </label>
            </div>

            {/* Upload Favicon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Favicon
              </label>
              <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition">
                <UploadCloud className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 text-sm">Choose Favicon File</span>
                <input type="file" className="hidden" {...register("favicon")} />
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreatePlatform;
