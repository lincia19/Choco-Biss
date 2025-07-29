import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts,setLatestProducts] = useState([]);

  

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'CHOCO'} text2={'DELIGHTS'} />
        <p className='w3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        lorem ipsum is simply dummy text of the printing and typesetting industry.lorem ipsum has been the.</p>
      </div>

    
    </div>
  );
};

export default LatestCollection;

