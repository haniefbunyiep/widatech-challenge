'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoMdAdd } from 'react-icons/io';
import { invoiceFormSchema } from '@/helper/invoice/schema';
import { useFormik } from 'formik';
import ComboboxForm from '../Dropdown/ProductDropdown';

export default function InvoiceModal() {
  const formik = useFormik({
    initialValues: {
      customer: '',
      sales_person: '',
      payment_method: '',
    },
    validationSchema: invoiceFormSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  return (
    <Dialog className='h-fit'>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          Add Invoice
          <IoMdAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Create Invoice by input customer name, sales person, and payment
            method.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='customer' className='text-left'>
                Customer
              </Label>
              <Input
                id='customer'
                name='customer'
                placeholder='Customer name'
                className='col-span-3'
                onChange={formik.handleChange}
                value={formik.values.customer}
              />
              <Label className='text-destructive'>
                {formik.errors.customer}
              </Label>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='sales_person' className='text-left'>
                Sales Person
              </Label>
              <Input
                id='sales_person'
                name='sales_person'
                placeholder='Sales person name'
                className='col-span-3'
                onChange={formik.handleChange}
                value={formik.values.sales_person}
              />
              <Label className='text-destructive'>
                {formik.errors.sales_person}
              </Label>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='payment_method' className='text-left'>
                Payment Method
              </Label>
              <Input
                id='payment_method'
                name='payment_method'
                placeholder='Payment Type'
                className='col-span-3'
                onChange={formik.handleChange}
                value={formik.values.payment_method}
              />
              <Label className='text-destructive'>
                {formik.errors.payment_method}
              </Label>
            </div>
            <div className='flex flex-col gap-2'>
              <ComboboxForm />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
