'use client';
import InvoiceTable from '@/components/InvoiceTable';
import MyForm from '@/components/Formik';
import ProductInput from '@/components/Dropdown/ProductDropdown';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 p-24'>
      <InvoiceTable />
      <MyForm />
    </main>
  );
}
