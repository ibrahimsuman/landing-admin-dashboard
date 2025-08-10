<<<<<<< HEAD
import BrandForm from "./BrandForm";
=======

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CategoryAndBrandList from "./CategoryAndBrandList";
>>>>>>> 5fe04d85f67f5bd5ba3238149aca4088fecaccce
import ProductCategory from "./ProductCategory";


export default function ProductCategoryAndBrand() {
<<<<<<< HEAD
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
=======
  return (
    <div>
      <div className=" flex gap-2 "> 
          <Dialog> 
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                Create Category +
              </Button>
            </DialogTrigger>

            {/* Modal Content */}
            <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new category</DialogTitle>
              </DialogHeader> 
              <ProductCategory /> 
              <DialogClose asChild>
                <Button 
                  aria-label="Close"
                  className="absolute rounded-full h-8 cursor-pointer w-8 top-3 right-3 bg-secondary text-white"
                >
                  ✕
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <Dialog> 
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                Create Brand +
              </Button>
            </DialogTrigger>

            {/* Modal Content */}
            <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new category</DialogTitle>
              </DialogHeader> 
              <ProductCategory /> 
              <DialogClose asChild>
                <Button 
                  aria-label="Close"
                  className="absolute rounded-full h-8 cursor-pointer w-8 top-3 right-3 bg-secondary text-white"
                >
                  ✕
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        
      </div>
      <div>
        <CategoryAndBrandList />
>>>>>>> 5fe04d85f67f5bd5ba3238149aca4088fecaccce
      </div>
    </div>
  </div>
);
}
