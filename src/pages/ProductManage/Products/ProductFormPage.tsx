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
    <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
        {/* Product Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="hidden">
            <label className="font-medium">User ID</label>
            <input
              {...register("userId")}
              className="border p-2 rounded w-full bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="font-medium">Title</label>
            <input
              placeholder="Product name"
              {...register("title", { required: "Title is required." })}
              className="border p-2 rounded w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Slug</label>
            <input
              {...register("slug", { required: "Slug is required." })}
              className="border p-2 rounded w-full"
            />
            {errors.slug && (
              <p className="text-red-500 text-xs mt-1">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Brand</label>
            <Select
              onValueChange={(value) => setValue("brand", value)}
              defaultValue=""
            >
              <SelectTrigger className="border p-2 rounded w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brandData?.data?.data.map((b: TBrand) => (
                  <SelectItem key={b._id} value={b.title}>
                    {b.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brand && (
              <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Categories</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-gray-500/60"
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
                      className="flex items-center gap-2 cursor-pointer"
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

          <div>
            <label className="font-medium">Base Price</label>
            <input
              type="number"
              {...register("basePrice", {
                required: "Base Price is required.",
                valueAsNumber: true,
              })}
              className="border p-2 rounded w-full"
            />
            {errors.basePrice && (
              <p className="text-red-500 text-xs mt-1">
                {errors.basePrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Discount Price</label>
            <input
              type="number"
              {...register("discountPrice", { required: "Discount Price is required.",
                valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
             {errors.discountPrice && (
              <p className="text-red-500 text-xs mt-1">
                {errors.discountPrice.message}
              </p>)}
          </div>

          <div>
            <label className="font-medium">Currency</label>
            <input
              {...register("currency", { required: "Currency is required. " })}
              className="border p-2 rounded w-full"
            />
            {errors.currency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currency.message}
              </p>
            )}
          </div>


          <div>
            <label className="font-medium">Short Description</label>
            <input
              {...register("shortDescription", {
                required: "Short description is required.",
              })}
              className="border p-2 rounded w-full"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required.",
              })}
              className="border p-2 rounded w-full"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Colors Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Colors</h3>
          {colorFields.map((color, i) => (
            <div
              key={color.id}
              className="border p-4 rounded mb-4 space-y-4 bg-gray-50"
            >
              {/* Color Name + Hex */}
              <div className="flex gap-3 items-center">
                <input
                  {...register(`colors.${i}.name` as const, {
                    required: "Color name is required.",
                  })}
                  placeholder="Color Name"
                  className="border p-2 rounded w-1/2"
                />
                {errors.colors?.[i]?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.colors[i]?.name?.message}
                  </p>
                )}

                <Controller
                  name={`colors.${i}.hexCode` as const}
                  control={control}
                  rules={{ required: "Please select color" }}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        {...field}
                        className="w-10 h-10 p-0 border rounded cursor-pointer"
                      />
                      <input
                        {...register(`colors.${i}.hexCode` as const)}
                        value={field.value}
                        className="border p-2 rounded w-24 text-sm"
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

              {/* Images */}
              <div>
                <h4 className="font-medium">Images</h4>
                <div className="space-y-2">
                  {watchColors[i].images.map((_, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <input
                        {...register(
                          `colors.${i}.images.${idx}.url` as const,
                          { required: "Image URL is required." }
                        )}
                        placeholder="Image URL"
                        className="border p-2 rounded w-full"
                      />
                      {errors.colors?.[i]?.images?.[idx]?.url && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.colors[i]?.images?.[idx]?.url?.message}
                        </p>
                      )}

                      <input
                        {...register(`colors.${i}.images.${idx}.alt` as const)}
                        placeholder="Alt Text"
                        className="border p-2 rounded w-full"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="py-1 text-primary rounded text-xs"
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

              {/* Sizes */}

              <div>
                <h4 className="font-medium mb-2">Sizes</h4>

                <div className="space-y-2">
                  {sizeOptions.map((size) => {
                    const existing = watchColors[i].sizes.find((s) => s.size === size);

                    return (
                      <div key={size} className="flex items-center gap-2">
                        {/* ✅ Shadcn Checkbox */}
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

                        <span className="w-16 font-medium">{size}</span>

                        {existing && (
                          <div className="flex gap-4 flex-wrap items-center">
                            {/* STOCK */}
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">Stock</span>
                              <input
                                type="number"
                                {...register(
                                  `colors.${i}.sizes.${watchColors[
                                    i
                                  ].sizes.indexOf(existing)}.stock` as const,
                                  {
                                    required: "Stock is required.",
                                    valueAsNumber: true,
                                  }
                                )}
                                className="border p-1 rounded text-sm"
                              />
                            </div>

                            {/* SKU */}
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">SKU</span>
                              <input
                                placeholder="Stock Keeping Unit"
                                {...register(
                                  `colors.${i}.sizes.${watchColors[
                                    i
                                  ].sizes.indexOf(existing)}.sku` as const,
                                  { required: "SKU is required." }
                                )}
                                className="border p-1 text-sm"
                              />
                            </div>

                            {/* PRICE */}
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">Price</span>
                              <input
                                type="number"
                                {...register(
                                  `colors.${i}.sizes.${watchColors[
                                    i
                                  ].sizes.indexOf(existing)}.price` as const,
                                  {
                                    required: "Price must required.",
                                    valueAsNumber: true,
                                  }
                                )}
                                className="border p-1 rounded text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Remove color button */}
              <button
                type="button"
                className="text-red-500 rounded text-xs"
                onClick={() => removeColor(i)}
              >
                - Remove Color
              </button>
            </div>
          ))}

          <button
            type="button"
            className="px-2 py-2 bg-green-500 text-white rounded text-xs"
            onClick={() =>
              appendColor({
                name: "",
                hexCode: "#000000",
                images: [{ url: "", alt: "" }],
                sizes: [],
              })
            }
          >
            + Add Color
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded cursor-pointer hover:bg-primary/80"
          >
            Submit Product
          </button>
        </div>

      </form>
    </div>
  );
};
