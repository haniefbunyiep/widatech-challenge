import { useCreateInvoiceMutation } from '../api/useCreateInvoiceMutation';

export const useCreateInovice = () => {
  const { mutate: mutationCreateInvoice } = useCreateInvoiceMutation({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    mutationCreateInvoice,
  };
};
