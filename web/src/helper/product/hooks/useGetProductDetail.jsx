import { useGetProductDetailQuery } from '../api/useGetProductDetailQuery';

export const useGetProductDetail = (productId) => {
  const { data, isLoading, refetch } = useGetProductDetailQuery(productId);

  return { data, isLoading, refetch };
};
