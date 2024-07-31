import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { useGetProductDetail } from '@/helper/product/hooks/useGetProductDetail';

export default function ProductCard({ productId, deleteFn }) {
  const { data } = useGetProductDetail(productId);

  const productData = data?.data?.data;
  console.log(productId);

  return (
    <Card className='mb-4 flex h-fit snap-center flex-col items-center justify-center gap-2 p-3'>
      <CardHeader className='flex h-full flex-row items-center gap-5'>
        <div size='sm' className='flex items-center justify-center'>
          <img
            src={productData?.image_url}
            alt={productData?.product_name}
            className='h-[70px]'
          />
        </div>
        <div className='flex flex-col'>
          <CardTitle>{productData?.product_name}</CardTitle>
          <CardDescription>Recent invoice from your store.</CardDescription>
        </div>
      </CardHeader>
      <Button
        type='button'
        onClick={() => deleteFn(productId)}
        className='w-full'
      >
        Delete
      </Button>
    </Card>
  );
}
