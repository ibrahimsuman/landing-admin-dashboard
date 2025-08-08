import { useEffect, useState } from "react";

// Static categories
const categories = [
  "Seeds", "Tools", "Fertilizer", "Pots", "Soil", "Planters",
  "Watering", "Decor", "Lights", "Compost", "Herbs", "Accessories"
];

// Static product data
const allProducts = [
  {
    id: 1,
    title: "Tomato Seeds",
    description: "Organic heirloom variety.",
    image: "https://cdn.prod.website-files.com/64022de562115a8189fe542a/6616718fe4a871d7278a2037_Product-Concept-What-Is-It-And-How-Can-You-Best-Use-It.jpg",
    price: 4.99,
    category: "Seeds",
  },
  {
    id: 2,
    title: "Garden Shovel",
    description: "Durable carbon steel.",
    image: "https://cdn.prod.website-files.com/64022de562115a8189fe542a/6616718fe4a871d7278a2037_Product-Concept-What-Is-It-And-How-Can-You-Best-Use-It.jpg",
    price: 9.99,
    category: "Tools",
  },
  {
    id: 3,
    title: "Organic Compost",
    description: "Nutrient-rich garden compost.",
    image: "https://cdn.prod.website-files.com/64022de562115a8189fe542a/6616718fe4a871d7278a2037_Product-Concept-What-Is-It-And-How-Can-You-Best-Use-It.jpg",
    price: 5.5,
    category: "Compost",
  },
];

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("Seeds");

  // Preload LCP image dynamically
  useEffect(() => {
    const firstProduct = allProducts.find(
      (p) => p.category === selectedCategory
    );
    if (firstProduct) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = firstProduct.image;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    }
  }, [selectedCategory]);

  const filteredProducts = allProducts.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Browse by Category</h1>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer border rounded-lg p-4 text-center shadow-sm hover:bg-blue-50 ${selectedCategory === cat ? "bg-blue-100 border-blue-500" : ""
              }`}
          >
            <p className="font-medium text-sm">{cat}</p>
          </div>
        ))}
      </div>

      {/* Product Cards */}
      <h2 className="text-xl font-semibold mb-3">
        Products in: <span className="text-blue-600">{selectedCategory}</span>
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <img
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-40 object-cover rounded-md mb-3"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <p className="text-blue-600 font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
