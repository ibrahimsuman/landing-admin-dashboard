import BrandForm from "./BrandForm";
import ProductCategory from "./ProductCategory";


export default function ProductCategoryAndBrand() {
 return (
  <div>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="border rounded-md p-4">
        <h2 className="text-lg font-bold mb-4 text-secondary">Create Category</h2>
        <ProductCategory />
      </div>
      <div className="border rounded-md p-4">
        <h2 className="text-lg font-bold mb-4 text-secondary">Create Brand</h2>
        <BrandForm />
      </div>
    </div>
  </div>
);
}
