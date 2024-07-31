'use client';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useGetRevenueMutation = ({ onSuccess, onError }) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({ dateRange, month }) => {
      return await axiosInstance.post(`/invoice/revenue`, { dateRange, month });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
    isSuccess,
    data,
  };
};
