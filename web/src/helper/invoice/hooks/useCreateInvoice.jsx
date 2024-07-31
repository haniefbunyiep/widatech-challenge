import { useCreateInvoiceMutation } from '../api/useCreateInvoiceMutation';
import { useToast } from '@/components/ui/use-toast';

export const useCreateInovice = () => {
  const { toast } = useToast();
  const { mutate: mutationCreateInvoice, isSuccess } = useCreateInvoiceMutation(
    {
      onSuccess: (res) => {
        console.log(res);
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
