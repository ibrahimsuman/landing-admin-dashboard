import { useState } from 'react';

const categories = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
}));

const ProductCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select a Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`cursor-pointer flex items-center justify-center h-24 rounded-xl border text-lg font-medium transition 
              ${selectedCategory === cat.id
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
              }`}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <p className="mt-6 text-center text-blue-600 font-medium">
          Selected Category: {selectedCategory}
        </p>
      )}
    </div>
  );
};

export default ProductCategory;
