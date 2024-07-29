'use client';
import InvoiceTable from '@/components/InvoiceTable';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 p-24'>
      <InvoiceTable />
    </main>
  );
}
