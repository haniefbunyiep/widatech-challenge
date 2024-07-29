import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/AxiosInstance';

export const useGetInvoiceQuery = (currentPage) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['invoice', currentPage],
    queryFn: async () => {
      return await axiosInstance.get(
        `http://localhost:8000/invoice?currentPage=${currentPage}`,
      );
    },
  });

  return { data, isLoading, refetch };
};
