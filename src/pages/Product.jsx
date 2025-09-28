// pages/Product.jsx
import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { allProducts, addToCart, currency } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p._id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/" className="text-rose-500 hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-rose-500">Home</Link>
          <span>›</span>
          <Link to="/collection" className="hover:text-rose-500">Collection</Link>
          <span>›</span>
          <span className="text-gray-800">{product.Name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img 
                src={product.image[selectedImage]} 
                alt={product.Name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-rose-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
            <p className="text-2xl font-bold text-rose-600 mb-6">{currency}{product.price}</p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {product.bestseller && (
              <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                🏆 Bestseller
              </span>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors"
              >
                Add to Cart
              </button>
              <button className="px-6 py-3 border border-rose-500 text-rose-500 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
                ♡ Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.longDescription || product.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <p className="text-gray-600">{product.ingredients || 'Cocoa, sugar, milk, and natural flavors'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;