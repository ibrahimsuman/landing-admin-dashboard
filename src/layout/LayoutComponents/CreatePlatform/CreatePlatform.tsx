import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppWindow, UploadCloud, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type ProductFormValues = {
  title: string;
};

const CreatePlatform = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    defaultValues: { title: "" },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "favicon"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "logo") {
      setLogoPreview(url);
      setLogoFile(file);
    } else {
      setFaviconPreview(url);
      setFaviconFile(file);
    }
  };

  const removeFile = (type: "logo" | "favicon") => {
    if (type === "logo") {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
      setLogoFile(null);
      if (logoInputRef.current) logoInputRef.current.value = ""; // reset input
    } else {
      if (faviconPreview) URL.revokeObjectURL(faviconPreview);
      setFaviconPreview(null);
      setFaviconFile(null);
      if (faviconInputRef.current) faviconInputRef.current.value = ""; // reset input
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    const payload = [
    {
      siteName: data.title,
      ...(logoFile && { 
        logo: { url: logoFile.name, alt: logoFile.name } 
      }),
    },
    ...(faviconFile
      ? [{
          favIcon: { url: faviconFile.name, alt: faviconFile.name },
        }]
      : []),
  ];

  console.log(payload);


    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (logoFile) formData.append("files", logoFile);
    if (faviconFile) formData.append("files", faviconFile);
    // fetch("http://landing.imranexporter.com/api", { method: "POST", body: formData })
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <AppWindow className="w-6 h-6 text-primary" /> Platform Creation
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Input
                placeholder="Business Full Name"
                className="py-2 px-4 border-gray-300 focus:border-primary focus:ring-primary hover:border-primary"
                {...register("title", { required: "Title is required." })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Logo
              </label>
              <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition">
                <UploadCloud className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 text-sm">Choose Logo File</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={logoInputRef}
                  onChange={(e) => handleFileChange(e, "logo")}
                />
              </label>
              {logoPreview && (
                <div className="mt-2 flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-16 h-16 object-contain border rounded cursor-pointer hover:scale-105 transition"
                      />
                    </DialogTrigger>
                    <DialogContent className="p-4 flex justify-center items-center">
                      <div className="border-2 border-gray-300 p-2 rounded-lg bg-white max-h-full max-w-full flex justify-center items-center">
                        <img
                          src={logoPreview}
                          alt="Logo Large Preview"
                          className="object-contain rounded-md"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFile("logo")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Favicon
              </label>
              <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition">
                <UploadCloud className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 text-sm">Choose Favicon File</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={faviconInputRef}
                  onChange={(e) => handleFileChange(e, "favicon")}
                />
              </label>
              {faviconPreview && (
                <div className="mt-2 flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <img
                        src={faviconPreview}
                        alt="Favicon Preview"
                        className="w-16 h-16 object-contain border rounded cursor-pointer hover:scale-105 transition"
                      />
                    </DialogTrigger>
                    <DialogContent className="p-4 flex justify-center items-center">
                      <div className="border-2 border-gray-300 p-2 rounded-lg bg-white max-h-full max-w-full flex justify-center items-center">
                        <img
                          src={faviconPreview}
                          alt="Favicon Large Preview"
                          className="object-contain rounded-md"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFile("favicon")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/80 text-white">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreatePlatform;
