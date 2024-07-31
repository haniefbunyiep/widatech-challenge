import { useGetRevenueMutation } from '../api/useGetRevenueMutation';
import { useToast } from '@/components/ui/use-toast';

export const useGetRevenue = () => {
  const { toast } = useToast();
  const {
    mutate: mutationGetRevenue,
    isSuccess,
    data,
  } = useGetRevenueMutation({
    onSuccess: (res) => {
      // console.log(res);
      //   toast({
      //     description: res?.data?.message,
      //     variant: 'destructive',
      //   });
    },
    onError: (err) => {
      console.log(err);
      //   toast({
      //     description: err?.response?.data?.message,
      //     variant: 'destructive',
      //   });
    },
  });

  return {
    mutationGetRevenue,
    isSuccess,
    data,
  };
};
