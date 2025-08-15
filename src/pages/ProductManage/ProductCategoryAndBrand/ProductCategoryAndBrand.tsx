import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SingleBrandForm from "./SingleBrandForm";
import SingleCategoryForm from "./SingleCategoryForm";
import CategoryAndBrandList from "./CategoryAndBrandList";
import { useState } from "react";



export default function ProductCategoryAndBrand() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-2">
        {/* Category Modal */}
        <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              Create Category +
            </Button>
          </DialogTrigger>

          <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new category</DialogTitle>
            </DialogHeader>
            <SingleCategoryForm closeModal={() => setIsCategoryModalOpen(false)} />
            <DialogClose asChild>
              <Button
                aria-label="Close"
                className="absolute flex items-center justify-center rounded-full h-5 w-5 cursor-pointer -top-3 -right-3 text-white bg-secondary p-0 leading-none"
              >
                ✕
              </Button>



            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* Brand Modal */}
        <Dialog open={isBrandModalOpen} onOpenChange={setIsBrandModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              Create Brand +
            </Button>
          </DialogTrigger>

          <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new brand</DialogTitle>
            </DialogHeader>
            <SingleBrandForm onSuccess={() => setIsBrandModalOpen(false)} />
            <DialogClose asChild>
              <Button
                aria-label="Close"
                className="absolute flex items-center justify-center rounded-full h-5 w-5 cursor-pointer -top-3 -right-3 text-white bg-secondary p-0 leading-none"
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
