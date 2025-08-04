import { useState } from "react";

type Product = {
  image: string;
  title: string;
  description: string;
  price: string;
  category: string;
};

const CreateProduct = () => {
  const [product, setProduct] = useState<Product>({
    image: "",
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Product submitted:", product);
    // You can POST this to your backend API here
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            rows={4}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="99.99"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="e.g. Gardening Tools"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
