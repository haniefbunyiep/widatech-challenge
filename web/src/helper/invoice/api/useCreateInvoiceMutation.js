'use client';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useCreateInvoiceMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({
      customer_name,
      sales_person,
      selected_product,
      payment_type,
    }) => {
      return await axiosInstance.post(`/invoice`, {
        customer_name,
        sales_person,
        selected_product,
        payment_type,
      });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
