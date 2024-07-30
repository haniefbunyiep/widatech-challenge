import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  items: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Name is required'),
        quantity: Yup.number()
          .required('Quantity is required')
          .positive()
          .integer(),
      }),
    )
    .required('At least one item is required'),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      items: [{ name: '', quantity: '' }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  const handleAddItem = () => {
    formik.setFieldValue('items', [
      ...formik.values.items,
      { name: '', quantity: '' },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = formik.values.items.filter((_, i) => i !== index);
    formik.setFieldValue('items', newItems);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.items.map((item, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`items.${index}.name`}>Name</label>
            <input
              id={`items.${index}.name`}
              name={`items.${index}.name`}
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={item.name}
            />
            {formik.touched.items?.[index]?.name &&
            formik.errors.items?.[index]?.name ? (
              <div>{formik.errors.items[index].name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor={`items.${index}.quantity`}>Quantity</label>
            <input
              id={`items.${index}.quantity`}
              name={`items.${index}.quantity`}
              type='number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={item.quantity}
            />
            {formik.touched.items?.[index]?.quantity &&
            formik.errors.items?.[index]?.quantity ? (
              <div>{formik.errors.items[index].quantity}</div>
            ) : null}
          </div>

          <button type='button' onClick={() => handleRemoveItem(index)}>
            Remove Item
          </button>
        </div>
      ))}

      <button type='button' onClick={handleAddItem}>
        Add Item
      </button>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default MyForm;
