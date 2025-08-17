import { useUserStore } from "@/store/useUser";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

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
  colors: {
    name: string;
    hexCode?: string;
    images: { url: string; alt: string }[];
    sizes: {
      size: string;
      stock: number;
      quantitySold: number;
      sku: string;
      price: number;
    }[];
  }[];
};

const ProductForm: React.FC<{ onSubmitForm: (data: ProductFormValues) => void }> = ({ onSubmitForm }) => {
  const { user } = useUserStore();
  const {
    register,
    control,
    handleSubmit,
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
      colors: [],
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: "colors",
  });

  const onSubmit = (data: ProductFormValues) => {
    const payload = { ...data, userId: user?.id || "" };
    console.log("Submit Payload:", payload);
    onSubmitForm(payload);
  };

  const RequiredLabel = ({ text }: { text: string }) => (
    <label className="block font-medium mb-1">
      {text} <span className="text-red-500">*</span>
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Title */}
      <div>
        <RequiredLabel text="Product Title" />
        <input
          {...register("title", { required: "Title is required" })}
          className="border p-2 rounded w-full"
          placeholder="Enter product title"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className="block font-medium mb-1">Slug</label>
        <input {...register("slug")} className="border p-2 rounded w-full" placeholder="Enter slug" />
      </div>

      {/* Short Description */}
      <div>
        <RequiredLabel text="Short Description" />
        <textarea
          {...register("shortDescription", { required: "Short description required" })}
          className="border p-2 rounded w-full"
          placeholder="Enter short description"
        />
        {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>}
      </div>

      {/* Description */}
      <div>
        <RequiredLabel text="Description" />
        <textarea
          {...register("description", { required: "Description required" })}
          className="border p-2 rounded w-full"
          placeholder="Enter full description"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Brand */}
      <div>
        <RequiredLabel text="Brand" />
        <input
          {...register("brand", { required: "Brand is required" })}
          className="border p-2 rounded w-full"
          placeholder="Enter brand"
        />
        {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
      </div>

      {/* Base Price */}
      <div>
        <RequiredLabel text="Base Price" />
        <input
          type="number"
          {...register("basePrice", { required: "Base price required", valueAsNumber: true })}
          className="border p-2 rounded w-full"
          placeholder="Enter base price"
        />
        {errors.basePrice && <p className="text-red-500 text-sm">{errors.basePrice.message}</p>}
      </div>

      {/* Discount Price */}
      <div>
        <label className="block font-medium mb-1">Discount Price</label>
        <input
          type="number"
          {...register("discountPrice", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
          placeholder="Enter discount price"
        />
      </div>

      {/* Currency */}
      <div>
        <RequiredLabel text="Currency" />
        <input
          {...register("currency", { required: "Currency required" })}
          className="border p-2 rounded w-full"
          placeholder="USD"
        />
        {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
      </div>

      {/* Colors */}
      <div className="md:col-span-2">
        <label className="block font-medium mb-2">Colors</label>
        {colorFields.map((color, colorIndex) => (
          <div key={color.id} className="border p-4 mb-4 rounded bg-white">
            {/* Name + Hex in flex row */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <RequiredLabel text="Color Name" />
                <input
                  {...register(`colors.${colorIndex}.name` as const, { required: "Color name required" })}
                  className="border p-2 rounded w-full"
                  placeholder="Color Name"
                />
              </div>
              <div>
                <RequiredLabel text="Hex Code" />
                <input
                  {...register(`colors.${colorIndex}.hexCode` as const)}
                  type="color"
                  className="w-16 h-10 border rounded"
                />
              </div>
            </div>

            {/* Images URL + Alt on same row */}
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <RequiredLabel text="Image URL" />
                <input
                  {...register(`colors.${colorIndex}.images.0.url` as const, { required: "Image URL required" })}
                  className="border p-2 rounded w-full"
                  placeholder="Image URL"
                />
              </div>
              <div className="flex-1">
                <RequiredLabel text="Alt Text" />
                <input
                  {...register(`colors.${colorIndex}.images.0.alt` as const)}
                  className="border p-2 rounded w-full"
                  placeholder="Alt text"
                />
              </div>
            </div>

            {/* Sizes */}
            <label className="block font-medium mt-3 mb-1">Sizes</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <RequiredLabel text="Size" />
                <input
                  {...register(`colors.${colorIndex}.sizes.0.size` as const, { required: "Size required" })}
                  className="border p-2 rounded w-full"
                  placeholder="M, L, XL"
                />
              </div>
              <div>
                <RequiredLabel text="Stock" />
                <input
                  type="number"
                  {...register(`colors.${colorIndex}.sizes.0.stock` as const, { required: "Stock required", valueAsNumber: true })}
                  className="border p-2 rounded w-full"
                  placeholder="Stock quantity"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity Sold</label>
                <input
                  type="number"
                  {...register(`colors.${colorIndex}.sizes.0.quantitySold` as const, { valueAsNumber: true })}
                  className="border p-2 rounded w-full"
                  placeholder="Quantity sold"
                />
              </div>
              <div>
                <RequiredLabel text="SKU" />
                <input
                  {...register(`colors.${colorIndex}.sizes.0.sku` as const, { required: "SKU required" })}
                  className="border p-2 rounded w-full"
                  placeholder="SKU"
                />
              </div>
              <div>
                <RequiredLabel text="Price" />
                <input
                  type="number"
                  {...register(`colors.${colorIndex}.sizes.0.price` as const, { required: "Price required", valueAsNumber: true })}
                  className="border p-2 rounded w-full"
                  placeholder="Price"
                />
              </div>
            </div>

            <button type="button" onClick={() => removeColor(colorIndex)} className="text-red-500 mt-2">
              Remove Color
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendColor({ name: "", hexCode: "#000000", images: [{ url: "", alt: "" }], sizes: [{ size: "", stock: 0, quantitySold: 0, sku: "", price: 0 }] })}
          className="text-primary"
        >
          + Add Color
        </button>
      </div>

      {/* Submit */}
      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-primary text-white py-2 px-6 rounded hover:opacity-90"
        >
          Create Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
