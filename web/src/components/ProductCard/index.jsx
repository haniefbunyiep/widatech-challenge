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

export default function ProductCard({ productId, deleteFn, productQuantity }) {
  const { data } = useGetProductDetail(productId);

  const productData = data?.data?.data;

  // console.log(productData);

  return (
    <Card className='mb-4 flex h-fit snap-center flex-col items-center justify-center gap-2 p-3'>
      <CardHeader className='flex h-full w-full flex-row items-center justify-start gap-5'>
        <div size='sm' className='flex w-[50%] items-center justify-center'>
          <img src={productData?.image_url} alt={productData?.product_name} />
        </div>
        <div className='flex w-[60%] flex-col'>
          <CardTitle>{productData?.product_name}</CardTitle>
          <CardDescription className='w-full'>
            <div>Quantity : {productQuantity}</div>
            <div className='flex'>
              Price : {''}
              {productData?.product_price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
          </CardDescription>
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
