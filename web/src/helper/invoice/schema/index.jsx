import * as Yup from 'yup';

export const invoiceFormSchema = Yup.object().shape({
  customer: Yup.string().min(3, 'Minimum character is 3').required('Required'),
  sales_person: Yup.string().required('Required'),
  payment_method: Yup.string().required('Required'),
  selected_product: Yup.array()
    .of(
      Yup.object({
        product_id: Yup.string().required('Required'),
        quantity: Yup.string().required('Quantity is required'),
        product_price: Yup.string().required('Required'),
      }),
    )
    .required('At least one item is required'),
});
