import { useCreateInvoiceMutation } from '../api/useCreateInvoiceMutation';
import { useToast } from '@/components/ui/use-toast';
import { useGetProduct } from '@/helper/product/hooks/useGetProduct';

export const useCreateInovice = () => {
  const { refetch } = useGetProduct();
  const { toast } = useToast();
  const { mutate: mutationCreateInvoice, isSuccess } = useCreateInvoiceMutation(
    {
      onSuccess: (res) => {
        toast({
          description: res?.data?.message,
        });
        refetch();
      },
      onError: (err) => {
        toast({
          description: err?.response?.data?.message,
          variant: 'destructive',
        });
      },
    },
  );

  return {
    mutationCreateInvoice,
    isSuccess,
  };
};
