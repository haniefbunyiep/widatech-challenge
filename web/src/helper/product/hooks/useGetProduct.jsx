import { useGetProductQuery } from '../api/useGetProductQuery';

export const useGetProduct = (name) => {
  const { data, isLoading, refetch } = useGetProductQuery(name);

  return { data, isLoading, refetch };
};
