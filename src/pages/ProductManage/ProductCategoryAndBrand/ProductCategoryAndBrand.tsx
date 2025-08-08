import ProductCategory from "./ProductCategory";


export default function ProductCategoryAndBrand() {
  return (
    <div>
      <div className="flex  gap-4 ">
        <div className="flex-1 border rounded-md p-4">
          <ProductCategory />
        </div>
        <div className="flex-1 border rounded-md p-4">
          Brand form hear
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}
