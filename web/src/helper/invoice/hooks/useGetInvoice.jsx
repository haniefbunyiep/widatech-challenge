import { useGetInvoiceQuery } from '../api/useGetInvoiceQuery';

export const useGetInvoice = (currentPage) => {
  const {
    data: dataInvoice,
    isLoading: invoiceIsloading,
    refetch,
  } = useGetInvoiceQuery(currentPage);

  return { dataInvoice, invoiceIsloading, refetch };
};
