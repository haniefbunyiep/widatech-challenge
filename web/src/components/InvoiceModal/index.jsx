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
import { IoMdAdd } from 'react-icons/io';
import { invoiceFormSchema, productSchema } from '@/helper/invoice/schema';
import { useFormik } from 'formik';
import PaymentInput from '../Dropdown/PaymentDropdown';
import ProductInput from '../Dropdown/ProductDropdown';
import { useCreateInovice } from '@/helper/invoice/hooks/useCreateInvoice';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProductCard from '../ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, resetProduct, removeProduct } from '@/store/product-slice';

export default function InvoiceModal() {
  const productSelector = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const { toast } = useToast();
  const { mutationCreateInvoice, isSuccess } = useCreateInovice();
  const [resetProductInput, setResetProductInput] = useState(false);

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
      mutationCreateInvoice({
        customer_name: formik.values.customer,
        sales_person: formik.values.sales_person,
        selected_product: productSelector.selectedProducts,
        payment_type: formik.values.payment_method,
      });
    },
  });

  const productFormik = useFormik({
    initialValues: {
      quantity: '',
      product_id: '',
    },
    validationSchema: productSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(addProduct(values));
      productFormik.resetForm();
      setResetProductInput(true);
    },
  });

  const handleAddProduct = () => {
    if (
      productSelector.selectedProducts?.some(
        (selectedProduct) =>
          selectedProduct.product_id === productFormik.values.product_id,
      )
    ) {
      toast({
        title: 'Product already added',
        description: 'This product is already in the invoice.',
        variant: 'destructive',
      });
      return;
    }

    productFormik.handleSubmit();
    setResetProductInput(true);
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ product_id: productId }));
  };

  const handleReset = () => {
    setResetProductInput(true);
    productFormik.resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      productFormik.resetForm();
      dispatch(resetProduct());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (resetProductInput) {
      setResetProductInput(false);
    }
  }, [resetProductInput]);

  return (
    <Dialog className='h-fit'>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          Add Invoice
          <IoMdAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[700px] sm:max-w-[425px]'>
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
              <div className='flex gap-2'>
                <ProductInput
                  formik={productFormik}
                  reset={resetProductInput}
                />
                <div className='flex flex-col items-center gap-2'>
                  <Input
                    type='number'
                    name={`quantity`}
                    placeholder='Quantity'
                    onChange={productFormik.handleChange}
                    value={productFormik.values.quantity}
                  />
                  <Label className='text-destructive'>
                    {productFormik.errors.quantity}
                  </Label>
                </div>
                <Button type='button' onClick={handleReset}>
                  Reset
                </Button>
              </div>
              {!productSelector?.selectedProducts?.length ? (
                <Label className='flex items-center justify-center p-5'>
                  Please Add Product First
                </Label>
              ) : (
                <ScrollArea className='flex h-[250px] snap-y snap-mandatory flex-col gap-2 rounded-md border p-4'>
                  {productSelector.selectedProducts.map((product) => (
                    <div key={product.product_id}>
                      <ProductCard
                        productId={product.product_id}
                        deleteFn={handleRemoveProduct}
                        productQuantity={product.quantity}
                      />
                    </div>
                  ))}
                </ScrollArea>
              )}
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
            <Button
              disabled={
                !productSelector?.selectedProducts?.length ||
                productFormik.errors.product_id ||
                productFormik.errors.quantity
              }
              type='submit'
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
