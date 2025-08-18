import { useUserStore } from "@/store/useUser";
import React from "react";
import { useForm, useFieldArray, Controller, type SubmitHandler } from "react-hook-form";

export type SizeOption = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "One-Size";

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

type Props = {
  onSubmitForm?: SubmitHandler<ProductFormValues>;
};

const sizeOptions: SizeOption[] = ["XS", "S", "M", "L", "XL", "2XL", "One-Size"];

export const ProductForm: React.FC<Props> = ({ onSubmitForm }) => {
  const { user } = useUserStore();

  const defaultSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log("Form submitted:", data);
  };

  const { register, control, handleSubmit, watch, setValue } = useForm<ProductFormValues>({
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
      colors: [{ name: "", hexCode: "#000000", images: [{ url: "", alt: "" }], sizes: [] }],
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: "colors",
  });

  const watchColors = watch("colors");

  return (
    <form onSubmit={handleSubmit(onSubmitForm || defaultSubmit)} className="space-y-4 text-sm">
      {/* Main Product Info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="hidden">
          <label className="font-medium ">User ID</label>
          <input {...register("userId")} className="border p-1 rounded w-full bg-gray-100" readOnly />
        </div>
        <div>
          <label className="font-medium">Title</label>
          <input {...register("title")} className="border p-1 rounded w-full" />
        </div>
        <div>
          <label className="font-medium">Slug</label>
          <input {...register("slug")} className="border p-1 rounded w-full" />
        </div>
        <div>
          <label className="font-medium">Brand</label>
          <input {...register("brand")} className="border p-1 rounded w-full" />
        </div>
        <div>
          <label className="font-medium">Base Price</label>
          <input type="number" {...register("basePrice", { valueAsNumber: true })} className="border p-1 rounded w-full" />
        </div>
        <div>
          <label className="font-medium">Discount Price</label>
          <input type="number" {...register("discountPrice", { valueAsNumber: true })} className="border p-1 rounded w-full" />
        </div>
        <div>
          <label className="font-medium">Currency</label>
          <input {...register("currency")} className="border p-1 rounded w-full" />
        </div>
        <div>
          <label className="font-medium">Category (comma separated)</label>
          <input {...register("category")} className="border p-1 rounded w-full" placeholder="Electronics, Audio" />
        </div>
        <div className="col-span-2">
          <label className="font-medium">Short Description</label>
          <input {...register("shortDescription")} className="border p-1 rounded w-full" />
        </div>
        <div className="col-span-2">
          <label className="font-medium">Description</label>
          <textarea {...register("description")} className="border p-1 rounded w-full" rows={3} />
        </div>
      </div>

      {/* Colors Section */}
      <div>
        <h3 className="font-semibold mb-2">Colors</h3>
        {colorFields.map((color, i) => (
          <div key={color.id} className="border p-3 rounded mb-3 space-y-3 bg-gray-50">
            <div className="flex gap-3 items-center">
              <input
                {...register(`colors.${i}.name` as const)}
                placeholder="Color Name"
                className="border p-1 rounded w-1/2"
              />
              <Controller
                name={`colors.${i}.hexCode` as const}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <input type="color" {...field} className="w-10 h-10 p-0 border rounded cursor-pointer" />
                    <input
                      {...register(`colors.${i}.hexCode` as const)}
                      value={field.value}
                      className="border p-1 rounded w-20 text-sm"
                    />
                  </div>
                )}
              />
            </div>

            {/* Images */}
            <div>
              <h4 className="font-medium">Images</h4>
              {watchColors[i].images.map((img, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 mb-1">
                  <input
                    {...register(`colors.${i}.images.${idx}.url` as const)}
                    placeholder="Image URL"
                    className="border p-1 rounded w-full"
                  />
                  <input
                    {...register(`colors.${i}.images.${idx}.alt` as const)}
                    placeholder="Alt Text"
                    className="border p-1 rounded w-full"
                  />
                </div>
              ))}
            </div>

            {/* Sizes */}
            <div>
              <h4 className="font-medium">Sizes</h4>
              <div className="grid grid-cols-1 gap-2">
                {sizeOptions.map((size) => {
                  const existing = watchColors[i].sizes.find((s) => s.size === size);
                  return (
                    <div key={size} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!existing}
                        onChange={(e) => {
                          const sizes = watchColors[i].sizes || [];
                          if (e.target.checked) {
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
                      <span className="w-16">{size}</span>
                      {existing && (
                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            value={existing.stock}
                            onChange={(e) => {
                              const updated = watchColors[i].sizes.map((s) =>
                                s.size === size ? { ...s, stock: parseInt(e.target.value) || 0 } : s
                              );
                              setValue(`colors.${i}.sizes`, updated);
                            }}
                            placeholder="Stock"
                            className="border p-1 rounded w-16"
                          />
                          <input
                            {...register(
                              `colors.${i}.sizes.${watchColors[i].sizes.indexOf(existing)}.sku` as const
                            )}
                            placeholder="SKU"
                            className="border p-1 rounded w-20"
                          />
                          <input
                            type="number"
                            value={existing.price}
                            onChange={(e) => {
                              const updated = watchColors[i].sizes.map((s) =>
                                s.size === size ? { ...s, price: parseInt(e.target.value) || 0 } : s
                              );
                              setValue(`colors.${i}.sizes`, updated);
                            }}
                            placeholder="Price"
                            className="border p-1 rounded w-16"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeColor(i)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove Color
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendColor({ name: "", hexCode: "#000000", images: [{ url: "", alt: "" }], sizes: [] })
          }
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Color
        </button>
      </div>

      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded mt-2">
        Submit
      </button>
    </form>
  );
};
