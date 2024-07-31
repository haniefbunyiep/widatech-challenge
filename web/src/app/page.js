'use client';
import InvoiceTable from '@/components/InvoiceTable';
import SimpleLineChart from '@/components/Graph';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10 p-24'>
      <InvoiceTable />
      <SimpleLineChart />
    </main>
  );
}
