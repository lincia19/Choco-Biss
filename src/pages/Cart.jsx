// pages/Cart.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, currency, updateQuantity, removeFromCart, getCartTotal, delivery_fee, clearCart } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious chocolates to get started!</p>
          <Link to="/" className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = getCartTotal() + delivery_fee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart ({cart.length} items)</h1>
          <button 
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-rose-600 font-bold">{currency}{item.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 p-2"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{currency}{delivery_fee}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{currency}{totalAmount}</span>
              </div>
            </div>

            <Link 
              to="/placeorder"
              className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold text-center block hover:bg-rose-600 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <Link 
              to="/"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-center block mt-3 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;