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
import PaymentInput from '../Dropdown/PaymentDropdown';
import ProductInput from '../Dropdown/ProductDropdown';
import { MdDelete } from 'react-icons/md';
import { useCreateInovice } from '@/helper/invoice/hooks/useCreateInvoice';

export default function InvoiceModal() {
  const { mutationCreateInvoice } = useCreateInovice();

  const formik = useFormik({
    initialValues: {
      customer: '',
      sales_person: '',
      payment_method: '',
      selected_product: [
        {
          quantity: '',
          product_id: '',
        },
      ],
    },
    validationSchema: invoiceFormSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log('Form values:', values);
      mutationCreateInvoice({
        customer_name: formik.values.customer,
        sales_person: formik.values.sales_person,
        selected_product: formik.values.selected_product,
        payment_type: formik.values.payment_method,
      });
    },
  });

  const handleAddProduct = () => {
    formik.setFieldValue('selected_product', [
      ...formik.values.selected_product,
      { product_id: '', quantity: '' },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = formik.values.selected_product.filter(
      (_, i) => i !== index,
    );
    formik.setFieldValue('selected_product', newProducts);
  };

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
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='selected_product' className='text-left'>
                Product
              </Label>
              {formik.values.selected_product.map((product, index) => (
                <div key={index} className='flex w-full items-center gap-2'>
                  <div className='w-[85%]'>
                    <ProductInput formik={formik} index={index} />
                  </div>
                  {index == 0 ? null : (
                    <Button
                      type='button'
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <MdDelete />
                    </Button>
                  )}
                </div>
              ))}
              <Label className='text-destructive'>
                {formik.errors.selected_product}
              </Label>
              <Button type='button' onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='payment_method' className='text-left'>
                Payment Method
              </Label>
              <PaymentInput formik={formik} />
              <Label className='text-destructive'>
                {formik.errors.payment_method}
              </Label>
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
