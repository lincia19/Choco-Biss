import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      to={`/product/${id}`} // ✅ Fixed the route path
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-64 object-cover hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>
      <div className="p-3 text-center">
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-base font-semibold text-gray-900 mt-1">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
