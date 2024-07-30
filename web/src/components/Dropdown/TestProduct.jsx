import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductInput({ formik, index }) {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <Label
          htmlFor={`selected_product.${index}.product_id`}
          className='text-left'
        >
          Product ID
        </Label>
        <Input
          id={`selected_product.${index}.product_id`}
          name={`selected_product.${index}.product_id`}
          placeholder='Product ID'
          onChange={formik.handleChange}
          value={formik.values.selected_product[index].product_id}
        />
        <Label className='text-destructive'>
          {formik.touched.selected_product?.[index]?.product_id &&
            formik.errors.selected_product?.[index]?.product_id}
        </Label>
      </div>
      <div className='flex flex-col gap-2'>
        <Label
          htmlFor={`selected_product.${index}.quantity`}
          className='text-left'
        >
          Quantity
        </Label>
        <Input
          id={`selected_product.${index}.quantity`}
          name={`selected_product.${index}.quantity`}
          placeholder='Quantity'
          onChange={formik.handleChange}
          value={formik.values.selected_product[index].quantity}
        />
        <Label className='text-destructive'>
          {formik.touched.selected_product?.[index]?.quantity &&
            formik.errors.selected_product?.[index]?.quantity}
        </Label>
      </div>
      <div className='flex flex-col gap-2'>
        <Label
          htmlFor={`selected_product.${index}.product_price`}
          className='text-left'
        >
          Product Price
        </Label>
        <Input
          id={`selected_product.${index}.product_price`}
          name={`selected_product.${index}.product_price`}
          placeholder='Product Price'
          onChange={formik.handleChange}
          value={formik.values.selected_product[index].product_price}
        />
        <Label className='text-destructive'>
          {formik.touched.selected_product?.[index]?.product_price &&
            formik.errors.selected_product?.[index]?.product_price}
        </Label>
      </div>
    </div>
  );
}
