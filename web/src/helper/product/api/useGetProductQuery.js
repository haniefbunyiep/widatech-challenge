import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useGetProductQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      return await axiosInstance.get('http://localhost:8000/product');
    },
  });
  return { data, isLoading, refetch };
};
