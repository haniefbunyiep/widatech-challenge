// components/ProductAutocomplete.tsx
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
// import products from '../data/products.json';
import { useGetProduct } from '@/helper/product/hooks/useGetProduct';

const ProductAutocomplete = ({ index }) => {
  const [suggestions, setSuggestions] = useState([]);
  const { setFieldValue } = useFormikContext();

  const { data } = useGetProduct();
  const productData = data?.data?.data;

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
    setSuggestions(filteredProducts);
  };

  const handleSuggestionClick = (product) => {
    setFieldValue(`products[${index}].name`, product.name);
    setFieldValue(`products[${index}].image`, product.image);
    setFieldValue(`products[${index}].stock`, product.stock);
    setFieldValue(`products[${index}].price`, product.price);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type='text'
        name={`products[${index}].name`}
        onChange={handleInputChange}
      />
      <div className='suggestions'>
        {suggestions.map((product) => (
          <div key={product.id} onClick={() => handleSuggestionClick(product)}>
            <img src={product.image} alt={product.name} width={50} />
            <span>{product.name}</span>
            <span>{product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAutocomplete;
