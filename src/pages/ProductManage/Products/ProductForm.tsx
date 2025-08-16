import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

type Size = {
  size: string;
  stock: number;
  quantitySold: number;
  sku: string;
  price: number;
};

type Image = {
  url: string;
  alt: string;
};

type Color = {
  name: string;
  hexCode: string;
  images: Image[];
  sizes: Size[];
};

type ProductFormValues = {
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

export const ProductForm: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    defaultValues: {
      userId: '',
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      category: [],
      brand: '',
      basePrice: 0,
      discountPrice: 0,
      currency: 'USD',
      colors: [],
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: 'colors',
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-primary/10 p-6 rounded space-y-6">
      {/* 2-column grid for main fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Title *</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="border p-2 w-full rounded"
            placeholder="Product Title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            {...register('slug')}
            className="border p-2 w-full rounded"
            placeholder="Product Slug"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Short Description *</label>
          <textarea
            {...register('shortDescription', { required: 'Short description required' })}
            className="border p-2 w-full rounded"
            placeholder="Short description"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            {...register('description', { required: 'Description required' })}
            className="border p-2 w-full rounded"
            placeholder="Full product description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Category *</label>
          <input
            {...register('category', { required: 'Category required' })}
            className="border p-2 w-full rounded"
            placeholder="Category (comma separated)"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Brand *</label>
          <input
            {...register('brand', { required: 'Brand required' })}
            className="border p-2 w-full rounded"
            placeholder="Brand"
          />
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Base Price *</label>
          <input
            type="number"
            {...register('basePrice', { required: 'Base price required', valueAsNumber: true })}
            className="border p-2 w-full rounded"
            placeholder="Base Price"
          />
          {errors.basePrice && <p className="text-red-500 text-sm">{errors.basePrice.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Discount Price</label>
          <input
            type="number"
            {...register('discountPrice', { valueAsNumber: true })}
            className="border p-2 w-full rounded"
            placeholder="Discount Price"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Currency *</label>
          <input
            {...register('currency', { required: 'Currency required' })}
            className="border p-2 w-full rounded"
            placeholder="Currency (USD)"
          />
          {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">Colors & Variants</h3>

        {colorFields.map((colorField, colorIndex) => (
          <div key={colorField.id} className="border p-4 rounded space-y-4 bg-white">
            {/* Color Name & Hex */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Color Name *</label>
                <input
                  {...register(`colors.${colorIndex}.name` as const, { required: 'Color name required' })}
                  className="border p-2 w-full rounded"
                  placeholder="Color name"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Hex Code</label>
                <input
                  {...register(`colors.${colorIndex}.hexCode` as const)}
                  type="color"
                  className="w-16 h-10 border rounded"
                />
              </div>
            </div>

            {/* Images */}
            <Controller
              control={control}
              name={`colors.${colorIndex}.images` as const}
              render={({ field }) => (
                <div className="space-y-2">
                  <h5 className="font-medium">Images</h5>
                  {field.value.map((_, imgIndex) => (
                    <div key={imgIndex} className="flex gap-2 items-center">
                      <input
                        placeholder="Image URL"
                        {...register(`colors.${colorIndex}.images.${imgIndex}.url` as const, {
                          required: 'Image URL required',
                        })}
                        className="border p-1 rounded flex-1"
                      />
                      <input
                        placeholder="Alt Text"
                        {...register(`colors.${colorIndex}.images.${imgIndex}.alt` as const)}
                        className="border p-1 rounded flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...field.value];
                          newImages.splice(imgIndex, 1);
                          field.onChange(newImages);
                        }}
                        className="text-red-500 px-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => field.onChange([...field.value, { url: '', alt: '' }])}
                    className="bg-primary text-white px-3 py-1 rounded"
                  >
                    Add Image
                  </button>
                </div>
              )}
            />

            {/* Sizes */}
            <Controller
              control={control}
              name={`colors.${colorIndex}.sizes` as const}
              render={({ field }) => (
                <div className="space-y-2">
                  <h5 className="font-medium">Sizes</h5>
                  {field.value.map((_, sizeIndex) => (
                    <div key={sizeIndex} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
                      <input
                        {...register(`colors.${colorIndex}.sizes.${sizeIndex}.size` as const, {
                          required: 'Size required',
                        })}
                        placeholder="Size"
                        className="border p-1 rounded"
                      />
                      <input
                        type="number"
                        {...register(`colors.${colorIndex}.sizes.${sizeIndex}.stock` as const, { valueAsNumber: true })}
                        placeholder="Stock"
                        className="border p-1 rounded"
                      />
                      <input
                        type="number"
                        {...register(`colors.${colorIndex}.sizes.${sizeIndex}.quantitySold` as const, { valueAsNumber: true })}
                        placeholder="Sold"
                        className="border p-1 rounded"
                      />
                      <input
                        {...register(`colors.${colorIndex}.sizes.${sizeIndex}.sku` as const)}
                        placeholder="SKU"
                        className="border p-1 rounded"
                      />
                      <input
                        type="number"
                        {...register(`colors.${colorIndex}.sizes.${sizeIndex}.price` as const, { valueAsNumber: true })}
                        placeholder="Price"
                        className="border p-1 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSizes = [...field.value];
                          newSizes.splice(sizeIndex, 1);
                          field.onChange(newSizes);
                        }}
                        className="text-red-500 px-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      field.onChange([...field.value, { size: '', stock: 0, quantitySold: 0, sku: '', price: 0 }])
                    }
                    className="bg-primary text-white px-3 py-1 rounded"
                  >
                    Add Size
                  </button>
                </div>
              )}
            />

            <button
              type="button"
              onClick={() => removeColor(colorIndex)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Remove Color
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendColor({ name: '', hexCode: '#ffffff', images: [], sizes: [] })}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          Add Color
        </button>
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-4">
        Submit Product
      </button>
    </form>
  );
};
