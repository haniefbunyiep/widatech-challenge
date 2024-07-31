import * as Yup from 'yup';

// export const invoiceFormSchema = Yup.object().shape({
//   customer: Yup.string().min(3, 'Minimum character is 3').required('Required'),
//   sales_person: Yup.string().required('Required'),
//   payment_method: Yup.string().required('Required'),
//   // selected_product: Yup.array()
//   //   .of(
//   //     Yup.object({
//   //       name: Yup.string().required('Name is required'),
//   //       quantity: Yup.number()
//   //         .required('Quantity is required')
//   //         .positive()
//   //         .integer(),
//   //     }),
//   //   )
//   //   .required('At least one item is required'),
// });

const productSchema = Yup.object().shape({
  product_id: Yup.number().required('Required'),
  quantity: Yup.number().required('Required'),
});

export const invoiceFormSchema = Yup.object().shape({
  customer: Yup.string().required('Customer is required'),
  sales_person: Yup.string().required('Sales person is required'),
  payment_method: Yup.string().required('Payment method is required'),
  selected_product: Yup.array().of(productSchema),
});
