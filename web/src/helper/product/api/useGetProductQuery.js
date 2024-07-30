import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useGetProductQuery = (name) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['product', name],
    queryFn: async () => {
      return await axiosInstance.get(`/product`);
    },
  });
  return { data, isLoading, refetch };
};
