// components/ProductItem.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, showAddButton = true }) => {
  const { currency, addToCart } = useContext(ShopContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ _id: id, Name: name, image: [image], price });
  };

  return (
    <Link
      className="group relative block text-gray-700 cursor-pointer border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden relative">
        <img
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
          src={image || '/placeholder.jpg'}
          alt={name}
        />
        {showAddButton && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-600"
            aria-label={`Add ${name} to cart`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </div>
      
      {/* SIMPLIFIED product info section - removed problematic classes */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-2 truncate" title={name}>
          {name}
        </h3>
        <p className="text-lg font-bold text-rose-600">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;