import { useGetProductQuery } from '../api/useGetProductQuery';

export const useGetProduct = () => {
  const { data, isLoading, refetch } = useGetProductQuery();

  return { data, isLoading, refetch };
};
