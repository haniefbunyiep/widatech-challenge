'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetInvoice } from '@/helper/invoice/hooks/useGetInvoice';
import { FirstCapital } from '@/helper/PaymentType';
import PaginationDemo from '../Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function InvoiceTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') || '1',
  );
  const [totalPage, setTotalPage] = useState();
  const { dataInvoice, invoiceIsloading, refetch } = useGetInvoice(currentPage);

  const data = dataInvoice?.data?.data?.invoiceData;

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleNextItem = () => {
    setCurrentPage((prevPage) => String(Number(prevPage) + 1));
  };

  const handlePrevItem = () => {
    setCurrentPage((prevPage) => String(Number(prevPage) - 1));
  };

  useEffect(() => {
    if (currentPage) {
      router.push(pathname + '?' + createQueryString('page', currentPage));
    }
  }, [currentPage, pathname, router, createQueryString]);

  useEffect(() => {
    if (dataInvoice) {
      setTotalPage(dataInvoice?.data?.data?.totalPage);
    }
  }, [dataInvoice]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      router.push(pathname + '?' + createQueryString('page', '1'));
    }
  }, [searchParams, pathname, router, createQueryString]);

  return (
    <Card className='p-3'>
      <CardHeader className='px-7'>
        <CardTitle>Invoice</CardTitle>
        <CardDescription>Recent invoice from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='min-h-[320px] min-w-[700px]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className='hidden text-center sm:table-cell'>
                  Sales Person
                </TableHead>
                <TableHead className='hidden text-center sm:table-cell'>
                  Product
                </TableHead>
                <TableHead className='hidden text-center sm:table-cell'>
                  Quantity
                </TableHead>
                <TableHead className='hidden text-center md:table-cell'>
                  Total Price
                </TableHead>
                <TableHead className='text-right'>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((data) => (
                <TableRow className='bg-accent' key={data?.id}>
                  <TableCell>
                    <div className='font-medium'>{data?.customer_name}</div>
                  </TableCell>
                  <TableCell className='hidden text-center sm:table-cell'>
                    {data?.sales_person}
                  </TableCell>
                  <TableCell className='hidden text-center sm:table-cell'>
                    {data?.product?.product_name}
                  </TableCell>
                  <TableCell className='hidden text-center md:table-cell'>
                    {data?.quantity}
                  </TableCell>
                  <TableCell className='text-center'>
                    {data?.total_price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </TableCell>
                  <TableCell className='text-center'>
                    {FirstCapital(data?.payment_type)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <PaginationDemo
        totalPage={totalPage}
        currentPage={currentPage}
        nextItem={handleNextItem}
        prevItem={handlePrevItem}
      />
    </Card>
  );
}
