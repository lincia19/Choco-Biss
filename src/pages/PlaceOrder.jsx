// pages/PlaceOrder.jsx
import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, getCartTotal, delivery_fee, currency, clearCart, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = getCartTotal() + delivery_fee;

  const handlePlaceOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your delicious chocolates are on their way!</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{currency}{item.price * item.quantity}</p>
                </div>
              ))}
              
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency}{getCartTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{currency}{delivery_fee}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{currency}{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                </div>
                
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                  required 
                />
                
                <input 
                  type="text" 
                  placeholder="Address" 
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                  required 
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="City" 
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP Code" 
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                </div>

                <button 
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors"
                >
                  Place Order - {currency}{totalAmount}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;