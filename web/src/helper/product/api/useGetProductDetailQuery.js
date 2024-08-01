import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useGetProductDetailQuery = (productId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: async () => {
      return await axiosInstance.get(`/product/detail?productId=${productId}`);
    },
  });
  return { data, isLoading, refetch };
};
