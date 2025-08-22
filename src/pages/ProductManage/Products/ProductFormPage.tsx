import { useBrand } from "@/action/Brand/useBrand";
import { useCategory } from "@/action/category/useCategory";
import { useUserStore } from "@/store/useUser";
import React from "react";


import {
  useForm,
  useFieldArray,
  Controller,
  type SubmitHandler,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".././../../components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { LucideUpload } from "lucide-react";

// ==== Types ====
export type SizeOption = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "One-Size";
export type TCategory = {
  _id: string;
  title: string;
  value: string;
};
export type TBrand = {
  _id: string;
  title: string;
  value: string;
};

export type ColorSize = {
  size: SizeOption;
  stock: number;
  sku: string;
  price: number;
};

export type Color = {
  name: string;
  hexCode: string;
  images: { url: string; alt: string }[];
  sizes: ColorSize[];
};

export type ProductFormValues = {
  userId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string[];
  brand: string;
  basePrice: number;
  discountPrice: number;
  currency: string;
  colors: Color[];
};

// ==== Form Component ====
const sizeOptions: SizeOption[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "One-Size",
];



export const ProductFormPage: React.FC = () => {
  const { user } = useUserStore();
  const { getCategoryQuery } = useCategory();
  const { getBrandQuery } = useBrand();

  const { data: categoryData } = getCategoryQuery;
  const { data: brandData } = getBrandQuery;

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log("Form submitted:", data);
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      userId: user?.id || "",
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      category: [],
      brand: "",
      basePrice: 0,
      discountPrice: 0,
      currency: "USD",
      colors: [
        {
          name: "",
          hexCode: "#000000",
          images: [{ url: "", alt: "" }],
          sizes: [],
        },
      ],
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const watchColors = watch("colors");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add a new product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
        {/* Product Info */}
        <Card className="py-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 sm:p-8">

            {/* Hidden UserId */}
            <div className="hidden">
              <label className="font-medium">User ID</label>
              <input
                {...register("userId")}
                className="border p-2 rounded w-full bg-gray-100
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                readOnly
              />
            </div>

            {/* Title */}
            <div>
              <label className="font-medium">Title</label>
              <input
                placeholder="Product name"
                {...register("title", { required: "Title is required." })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="font-medium">Slug</label>
              <input
                {...register("slug", { required: "Slug is required." })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
              />
              {errors.slug && (
                <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="font-medium">Brand</label>
              <Select
                onValueChange={(value) => setValue("brand", value)}
                defaultValue=""
              >
                <SelectTrigger className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brandData?.data?.data.map((b: TBrand) => (
                    <SelectItem
                      key={b._id}
                      value={b.title}
                      className="cursor-pointer focus:bg-primary/10 focus:text-primary 
                    data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary"
                    >
                      {b.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.brand && (
                <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block font-medium">Categories</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-gray-500/60 
                  focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                    type="button"
                  >
                    {watch("category").length > 0
                      ? watch("category").join(", ")
                      : "Select Categories"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="flex flex-col gap-2">
                    {categoryData?.data?.data.map((cat: TCategory) => (
                      <label
                        key={cat._id}
                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md 
                      hover:bg-primary/10 hover:text-primary"
                      >
                        <Checkbox
                          checked={watch("category").includes(cat.title)}
                          onCheckedChange={() => {
                            const current = watch("category");
                            if (current.includes(cat.title)) {
                              setValue(
                                "category",
                                current.filter((c) => c !== cat.title)
                              );
                            } else {
                              setValue("category", [...current, cat.title]);
                            }
                          }}
                        />
                        {cat.title}
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {/* Base Price */}
            <div>
              <label className="font-medium">Base Price</label>
              <input
                type="number"
                {...register("basePrice", {
                  required: "Base Price is required.",
                  valueAsNumber: true,
                })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
              />
              {errors.basePrice && (
                <p className="text-red-500 text-xs mt-1">{errors.basePrice.message}</p>
              )}
            </div>

            {/* Discount Price */}
            <div>
              <label className="font-medium">Discount Price</label>
              <input
                type="number"
                {...register("discountPrice", {
                  required: "Discount Price is required.",
                  valueAsNumber: true,
                })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
              />
              {errors.discountPrice && (
                <p className="text-red-500 text-xs mt-1">{errors.discountPrice.message}</p>
              )}
            </div>

            {/* Currency */}
            <div>
              <label className="font-medium">Currency</label>
              <input
                {...register("currency", { required: "Currency is required." })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
              />
              {errors.currency && (
                <p className="text-red-500 text-xs mt-1">{errors.currency.message}</p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="font-medium">Short Description</label>
              <input
                {...register("shortDescription", {
                  required: "Short description is required.",
                })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            {/* Full-width Description */}
            <div className="col-span-1 sm:col-span-2">
              <label className="font-medium">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required.",
                })}
                className="border p-2 rounded w-full 
              focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </Card>
        {/* Colors Section */}
        <Card className="py-0">
          {colorFields.map((color, i) => (
            <div key={color.id} className="p-8 rounded space-y-4">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Color Name + Hex + Images */}
                <div className="flex-1 space-y-4">
                  {/* Color Name + Hex */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Color Title</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Color Name */}
                      <div className="flex flex-col w-full sm:w-1/2">
                        <input
                          {...register(`colors.${i}.name` as const, {
                            required: "Color name is required.",
                          })}
                          placeholder="Color Name"
                          className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                        />
                        {errors.colors?.[i]?.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.colors[i]?.name?.message}
                          </p>
                        )}
                      </div>

                      {/* Hex Code */}
                      <div className="flex flex-col w-full sm:w-1/2">
                        <Controller
                          name={`colors.${i}.hexCode` as const}
                          control={control}
                          rules={{ required: "Please select color" }}
                          render={({ field }) => (
                            <div className="flex items-center gap-2 w-full">
                              <input
                                type="color"
                                {...field}
                                className="w-10 h-10 p-0 cursor-pointer flex-shrink-0"
                              />
                              <input
                                {...register(`colors.${i}.hexCode` as const)}
                                value={field.value}
                                className="border p-2 rounded text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                              />
                            </div>
                          )}
                        />
                        {errors.colors?.[i]?.hexCode && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.colors[i]?.hexCode?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h4 className="font-medium mb-2">Images</h4>
                    <div className="space-y-2">
                      {watchColors[i].images.map((_, idx) => (
                        <div key={idx} className="flex flex-wrap gap-2 items-center">
                          {/* Browse Image Button */}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id={`file-input-${i}-${idx}`}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                const images = [...watchColors[i].images];
                                images[idx].url = url;
                                setValue(`colors.${i}.images`, images);
                              }
                            }}
                          />
                          <label
                            htmlFor={`file-input-${i}-${idx}`}
                            className="flex items-center justify-center gap-1 border hover:border-primary/50 p-2 rounded cursor-pointer w-28"
                          >
                            <LucideUpload className="w-4 h-4" />
                            Browse
                          </label>

                          {/* Image URL */}
                          <input
                            {...register(`colors.${i}.images.${idx}.url` as const, {
                              required: "Image URL is required.",
                            })}
                            placeholder="Image URL"
                            className="border p-2 rounded flex-1 min-w-[120px] sm:min-w-[200px] focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                          />

                          {/* Alt Text */}
                          <input
                            {...register(`colors.${i}.images.${idx}.alt` as const)}
                            placeholder="Alt Text"
                            className="border p-2 rounded w-24 sm:w-32 text-sm focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        className="py-1 text-primary cursor-pointer text-xs"
                        onClick={() =>
                          setValue(`colors.${i}.images`, [
                            ...watchColors[i].images,
                            { url: "", alt: "" },
                          ])
                        }
                      >
                        + Add Image
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Sizes */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-medium mb-2">Sizes</h4>
                  <div className="space-y-2">
                    {sizeOptions.map((size) => {
                      const existing = watchColors[i].sizes.find((s) => s.size === size);

                      return (
                        <div
                          key={size}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full"
                        >
                          {/* Left side: Checkbox + Size */}
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={!!existing}
                              onCheckedChange={(checked) => {
                                const sizes = watchColors[i].sizes || [];
                                if (checked) {
                                  setValue(`colors.${i}.sizes`, [
                                    ...sizes,
                                    { size, stock: 0, sku: "", price: 0 },
                                  ]);
                                } else {
                                  setValue(
                                    `colors.${i}.sizes`,
                                    sizes.filter((s) => s.size !== size)
                                  );
                                }
                              }}
                            />
                            <span className="w-18 font-medium">{size}</span>
                          </div>

                          {/* Right side: Stock, SKU, Price */}
                          {existing && (
                            <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4 flex-1">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">Stock</span>
                                <input
                                  type="number"
                                  {...register(
                                    `colors.${i}.sizes.${watchColors[i].sizes.indexOf(
                                      existing
                                    )}.stock` as const,
                                    { required: "Stock is required.", valueAsNumber: true }
                                  )}
                                  className="border p-1 rounded text-sm w-16 focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">SKU</span>
                                <input
                                  placeholder="SKU"
                                  {...register(
                                    `colors.${i}.sizes.${watchColors[i].sizes.indexOf(
                                      existing
                                    )}.sku` as const,
                                    { required: "SKU is required." }
                                  )}
                                  className="border p-1 rounded text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">Price</span>
                                <input
                                  type="number"
                                  {...register(
                                    `colors.${i}.sizes.${watchColors[i].sizes.indexOf(
                                      existing
                                    )}.price` as const,
                                    { required: "Price is required.", valueAsNumber: true }
                                  )}
                                  className="border p-1 rounded text-sm w-20 focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/50"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  type="button"
                  className=" bg-primary/50 text-white text-xs"
                  onClick={() =>
                    appendColor({
                      name: "",
                      hexCode: "#000000",
                      images: [{ url: "", alt: "" }],
                      sizes: [],
                    })
                  }
                >
                  + Add More
                </Button>
                <button
                  type="button"
                  className="text-red-500 rounded text-xs"
                  onClick={() => removeColor(i)}
                >
                  - Remove Color
                </button>
              </div>
            </div>
          ))}
        </Card>
        <div className="flex justify-center">
          <div className="flex flex-col-row justify-center gap-3 sm:gap-4 mt-6 w-full sm:w-auto">
            {/* Discard Button */}
            <button
              type="button"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 text-sm sm:text-base"
            >
              Discard
            </button>

            {/* Save Draft Button */}
            <button
              type="button"
              className="px-4 sm:px-6 py-2 sm:py-3 border border-secondary/50 bg-secondary/5 text-secondary rounded cursor-pointer hover:bg-secondary/50 hover:text-white text-sm sm:text-base"
            >
              Save Draft
            </button>

            {/* Publish Product Button */}
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 sm:py-3 font-semibold bg-primary text-white rounded cursor-pointer hover:bg-primary/80 text-sm sm:text-base"
            >
              Publish Product
            </button>
          </div>
        </div>


      </form>
    </div>
  );
};
