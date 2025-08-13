import { useCategory, type TCategory } from '@/action/category/useCategory';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


// NEW: Import AlertDialog components from shadcn/ui alert dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { useBrand, type TBrand } from '@/action/Brand/useBrand';

function DeleteCategoryDialog({
  categoryId,
  onDelete,
}: {
  categoryId: string;
  onDelete: (id: string) => void;
}) {
  return (
 <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button
      variant="default"
      size="sm"
      className="cursor-pointer group hover:bg-secondary hover:text-white "
    >
      <Trash size={14} className="transition-colors" />
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent className="flex flex-col items-center justify-center text-center">
    <AlertDialogHeader className="flex flex-col items-center justify-center">
      <AlertDialogTitle className='text-red-600'>
        Are you sure you want to delete?
      </AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the category.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter className="flex items-center justify-center gap-3 mt-4">
      <AlertDialogCancel className=' cursor-pointer'>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={() => onDelete(categoryId)}
        className="bg-red-600 hover:bg-red-700 cursor-pointer"
      >
        Confirm Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  );
}

const CategoryAndBrandList = () => {
  const { getCategoryQuery, deleteCategoryMutation } = useCategory();
  const {getBrandQuery, deleteBrandMutation} = useBrand();

  const { data: catagoryData, isLoading: isCategoryLoading } = getCategoryQuery;
  if (isCategoryLoading) {
    return 'loading...';
  }
  const { data: brandData, isLoading } = getBrandQuery;
  if (isLoading) {
    return 'loading...';
  }

  return (
    <div className="border mt-4 rounded-md p-4 w-full md:w-1/2">
      <Tabs defaultValue="category" className="text-center">
        <TabsList className="w-full flex justify-center gap-2 bg-primary/10">
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
        </TabsList>

        <TabsContent value="category">
          <Table className="text-center">
            <TableCaption className="text-center">
              A list of your recent categories.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {catagoryData?.data.data.map((cat: TCategory) => (
                <TableRow key={cat.title}>
                  <TableCell className="font-medium text-center">
                    {cat.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {cat.value}
                  </TableCell>
                  <TableCell className="text-center">
                    {/* NEW: Use AlertDialog delete confirmation */}
                    <DeleteCategoryDialog
                      categoryId={cat._id}
                      onDelete={(id) => deleteCategoryMutation.mutate(id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

{/* // For Brand // */}

        <TabsContent value="brand">
          <Table className="text-center">
            <TableCaption className="text-center">
              A list of your recent brands.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Brand</TableHead>
                <TableHead className="text-center">Product</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandData?.data.data.map((brand:TBrand) => (
                <TableRow key={brand.title}>
                  <TableCell className="font-medium text-center">
                    {brand.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {brand.value}
                  </TableCell>
                  <TableCell className="text-center">
                    {/* NEW: Use AlertDialog delete confirmation */}
                    <DeleteCategoryDialog
                      categoryId={brand._id}
                      onDelete={(id) => deleteBrandMutation.mutate(id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoryAndBrandList;
