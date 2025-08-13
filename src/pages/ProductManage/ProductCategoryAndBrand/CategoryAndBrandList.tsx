import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategory, type TCategory } from "@/action/category/useCategory";
import { useBrand, type TBrand } from "@/action/Brand/useBrand";
import { DeleteItemDialog } from "./DeleteItemDialog";

const CategoryAndBrandList = () => {
  const { getCategoryQuery, deleteCategoryMutation } = useCategory();
  const { getBrandQuery, deleteBrandMutation } = useBrand();

  const { data: categoryData, isLoading: isCategoryLoading } = getCategoryQuery;
  const { data: brandData, isLoading: isBrandLoading } = getBrandQuery;

  if (isCategoryLoading || isBrandLoading) return "Loading...";

  return (
    <div className="border mt-4 rounded-md p-4 w-full md:w-1/2">
      <Tabs defaultValue="category" className="text-center">
        <TabsList className="w-full flex justify-center gap-2 bg-primary/10">
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
        </TabsList>

        {/* CATEGORY TAB */}
        <TabsContent value="category">
          <Table className="text-center">
            <TableCaption>A list of your recent categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData?.data.data.map((cat: TCategory) => (
                <TableRow key={cat._id}>
                  <TableCell className="font-medium text-center">{cat.title}</TableCell>
                  <TableCell className="text-center">{cat.value}</TableCell>
                  <TableCell className="text-center">
                    <DeleteItemDialog
                      itemId={cat._id}
                      itemName={cat.title}
                      onDelete={(id) => deleteCategoryMutation.mutate(id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* BRAND TAB */}
        <TabsContent value="brand">
          <Table className="text-center">
            <TableCaption>A list of your recent brands.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Brand</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandData?.data.data.map((brand: TBrand) => (
                <TableRow key={brand._id}>
                  <TableCell className="font-medium text-center">{brand.title}</TableCell>
                  <TableCell className="text-center">{brand.value}</TableCell>
                  <TableCell className="text-center">
                    <DeleteItemDialog
                      itemId={brand._id}
                      itemName={brand.title}
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
