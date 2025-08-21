import { useCategory, type TCategory } from '@/action/category/useCategory';
import { Card } from '@/components/ui/card';

const ProductList = () => {

    const { getCategoryQuery } = useCategory();
    const { data: categoryData, isLoading: isCategoryLoading } = getCategoryQuery;
    if (isCategoryLoading) return 'loading...';


  return (
    <>
    <h1 className='text-2xl font-semibold pb-4'>Browse the products</h1>
    <div className='flex items-center gap-4'>
       {categoryData?.data.data.map((cat: TCategory) => (
               <Card className='py-4'>
                <h1 className='px-4'>{cat.title}</h1>
               </Card>
              ))}
    </div>
</>
  );
};

export default ProductList;