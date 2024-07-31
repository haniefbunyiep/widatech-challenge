'use client';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useGetRevenueMutation = ({ onSuccess, onError }) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({ dateRange }) => {
      return await axiosInstance.post(`/invoice/revenue`, { dateRange });
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
