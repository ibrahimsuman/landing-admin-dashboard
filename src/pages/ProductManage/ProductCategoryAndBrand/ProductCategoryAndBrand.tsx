
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CategoryAndBrandList from "./CategoryAndBrandList";
import ProductCategory from "./ProductCategory";


export default function ProductCategoryAndBrand() {

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
      </div>
    </div>
);
}
