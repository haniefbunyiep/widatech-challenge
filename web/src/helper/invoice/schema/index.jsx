import * as Yup from 'yup';

export const invoiceFormSchema = Yup.object().shape({
  customer: Yup.string().min(3, 'Minimum character is 3').required('Required'),
  sales_person: Yup.string().required('Required'),
  payment_method: Yup.string().required('Required'),
  selected_product: Yup.array()
    .of(
      Yup.object({
        product_id: Yup.number().required('Required'),
        quantity: Yup.number().required('Quantity is required'),
      }),
    )
    .required('At least one item is required'),
});
