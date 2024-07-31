// components/InvoiceForm.tsx
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ProductAutocomplete from './ProductAutoComplete';

const initialValues = {
  date: '',
  customerName: '',
  salespersonName: '',
  notes: '',
  products: [{ name: '', image: '', stock: 0, price: 0 }],
};

const validationSchema = Yup.object({
  date: Yup.string().required('Date is required'),
  customerName: Yup.string().required('Customer name is required'),
  salespersonName: Yup.string().required('Salesperson name is required'),
  products: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Product name is required'),
      image: Yup.string(),
      stock: Yup.number()
        .min(1, 'Stock must be at least 1')
        .required('Stock is required'),
      price: Yup.number()
        .min(0, 'Price must be a positive number')
        .required('Price is required'),
    }),
  ),
});

const InvoiceForm = () => {
  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/invoices', values);
      alert('Invoice submitted successfully!');
    } catch (error) {
      console.error('Error submitting invoice', error);
      alert('Failed to submit invoice');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <div>
            <label>Date</label>
            <Field name='date' type='date' />
            <ErrorMessage name='date' component='div' />
          </div>
          <div>
            <label>Customer Name</label>
            <Field name='customerName' />
            <ErrorMessage name='customerName' component='div' />
          </div>
          <div>
            <label>Salesperson Name</label>
            <Field name='salespersonName' />
            <ErrorMessage name='salespersonName' component='div' />
          </div>
          <div>
            <label>Notes</label>
            <Field name='notes' as='textarea' />
          </div>
          <FieldArray name='products'>
            {({ push, remove }) => (
              <div>
                {values.products.map((_, index) => (
                  <div key={index}>
                    <ProductAutocomplete index={index} />
                    <Field name={`products[${index}].image`} type='hidden' />
                    <Field name={`products[${index}].stock`} type='number' />
                    <ErrorMessage
                      name={`products[${index}].stock`}
                      component='div'
                    />
                    <Field name={`products[${index}].price`} type='number' />
                    <ErrorMessage
                      name={`products[${index}].price`}
                      component='div'
                    />
                    <button type='button' onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() =>
                    push({ name: '', image: '', stock: 0, price: 0 })
                  }
                >
                  Add Product
                </button>
              </div>
            )}
          </FieldArray>
          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceForm;
