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
import PaginationDemo from '../Pagination';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import InvoiceModal from '../InvoiceModal';

const createQueryString = (searchParams, name, value) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};

export default function InvoiceTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') || '1',
  );
  const [totalPage, setTotalPage] = useState();
  const { dataInvoice } = useGetInvoice(currentPage);

  const data = dataInvoice?.data?.data?.invoiceData;

  console.log(data);

  const handleNextItem = () => {
    setCurrentPage((prevPage) => String(Number(prevPage) + 1));
  };

  const handlePrevItem = () => {
    setCurrentPage((prevPage) => String(Number(prevPage) - 1));
  };

  useEffect(() => {
    if (currentPage) {
      router.push(
        pathname + '?' + createQueryString(searchParams, 'page', currentPage),
      );
    }
  }, [currentPage, pathname, router, searchParams]);

  useEffect(() => {
    if (dataInvoice) {
      setTotalPage(dataInvoice?.data?.data?.totalPage);
    }
  }, [dataInvoice]);

  useEffect(() => {
    if (!searchParams.get('page') || searchParams.get('page') > totalPage) {
      router.push(
        pathname + '?' + createQueryString(searchParams, 'page', '1'),
      );
    }
  }, [searchParams, pathname, router]);

  return (
    <Card className='p-3'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Invoice</CardTitle>
          <CardDescription>Recent invoice from your store.</CardDescription>
        </div>
        <div size='sm' className='ml-auto gap-1'>
          <InvoiceModal />
        </div>
      </CardHeader>
      <CardContent>
        <div className='lg:min-h-[320px] lg:min-w-[700px]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='hidden text-center sm:table-cell'>
                  Order Date
                </TableHead>
                <TableHead className='text-center'>Customer</TableHead>
                <TableHead className='hidden text-center sm:table-cell'>
                  Sales Person
                </TableHead>
                <TableHead className='hidden text-center sm:table-cell'>
                  Quantity
                </TableHead>
                <TableHead className='hidden text-center md:table-cell'>
                  Total Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((data) => (
                <TableRow className='bg-accent' key={data?.id}>
                  <TableCell>
                    <div className='text-center font-medium'>
                      {data?.order_date.split('T')[0]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='text-center font-medium'>
                      {data?.customer_name}
                    </div>
                  </TableCell>
                  <TableCell className='hidden text-center sm:table-cell'>
                    {data?.sales_person}
                  </TableCell>
                  <TableCell className='hidden text-center sm:table-cell'>
                    {data?.quantity}
                  </TableCell>
                  <TableCell className='text-center'>
                    {data?.total_price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
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
