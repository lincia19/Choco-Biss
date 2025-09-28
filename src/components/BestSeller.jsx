// components/BestSeller.jsx
import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    console.log('BestSeller Products:', products); // Debug log
    
    if (products && products.length > 0) {
      // Check product structure
      console.log('First product:', products[0]);
      
      const bestProduct = products.filter((item) => item.bestseller === true);
      console.log('BestSeller items:', bestProduct);
      
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className='my-10 pt-8'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 mx-auto text-sm md:text-base text-gray-600'>
          <i>"Made at home with heart — our chocolates are little bundles of joy, perfect for every occasion."</i>
        </p>
      </div>

      {bestSeller.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No bestsellers found. Check your product data.</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {bestSeller.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              image={item.image && item.image[0] ? item.image[0] : '/placeholder.jpg'}
              name={item.Name || item.name || 'Unnamed Product'}
              price={item.price || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;