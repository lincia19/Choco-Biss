// pages/PlaceOrder.jsx
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, getCartTotal, delivery_fee, currency, clearCart, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  // COD Address State
  const [codAddress, setCodAddress] = useState({
    name: '',
    address: '',
    locality: '',
    house: '',
    pincode: '',
    district: '',
    state: '',
    phone: ''
  });

  const totalAmount = getCartTotal() + delivery_fee;
  const paymentMethod = localStorage.getItem('paymentMethod');

  // Debug: Log everything on component load
  useEffect(() => {
    console.log('🔍 PlaceOrder Debug - Component loaded:');
    console.log('🔍 paymentMethod:', paymentMethod);
    console.log('🔍 cart items:', cart);
    console.log('🔍 user:', user);
    console.log('🔍 totalAmount:', totalAmount);
  }, []);

  useEffect(() => {
    if (!paymentMethod && !orderPlaced) {
      const t = setTimeout(() => navigate('/payment'), 600);
      return () => clearTimeout(t);
    }
  }, [paymentMethod, navigate]);

  if (!paymentMethod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Redirecting to payment selection…</h2>
          <p className="text-gray-600">You will be taken to the payment page shortly. If nothing happens, click below.</p>
          <div className="flex justify-center mt-4">
            <button onClick={() => navigate('/payment')} className="bg-rose-500 text-white px-4 py-2 rounded mr-2">Go to Payment</button>
            <button onClick={() => navigate('/cart')} className="border px-4 py-2 rounded">Back to Cart</button>
          </div>
        </div>
      </div>
    );
  }

  const handleCODOrder = async () => {
    console.log('🟡 handleCODOrder called');
    
    // Validate COD address
    if (!codAddress.name || !codAddress.address || !codAddress.district || !codAddress.phone) {
      alert('Please fill all delivery address fields for COD');
      return;
    }

    // Check if district is Thane
    if (codAddress.district.trim().toLowerCase() !== 'thane') {
      alert('Order cannot be placed outside Thane district.');
      return;
    }

    console.log('🚀 Starting COD order process...');
    console.log('📦 Cart:', cart);
    console.log('🏠 Address:', codAddress);
    
    setProcessing(true);
    toast.info('Processing COD order...');
    
    try {
      // Get user from context or localStorage
      const currentUser = JSON.parse(localStorage.getItem('chocoBissUser'));
      const userId = currentUser?.id || "guest-user-" + Date.now();

      console.log('👤 User ID:', userId);

      // Prepare order data for backend - USE THE WORKING FORMAT
      const orderData = {
        user: userId,
        items: cart.map(item => ({
          product: item.id || `product-${Date.now()}`,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/default-image.jpg"
        })),
        totalAmount: totalAmount,
        paymentMethod: 'cod',
        shippingAddress: codAddress
      };

      console.log('📤 Sending order data to backend:', JSON.stringify(orderData, null, 2));

      // Call your backend API
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      const result = await response.json();
      console.log('📥 Response data:', result);
      
      if (response.ok) {
        console.log('✅ COD Order created successfully');
        const id = result.order._id || result.order.orderId;
        setOrderId(id);
        setOrderPlaced(true);
        clearCart();
        localStorage.removeItem('paymentMethod');
        toast.success('COD order placed successfully! 🎉');
      } else {
        console.log('❌ Backend error:', result.message);
        throw new Error(result.message || 'Failed to create COD order');
      }
    } catch (error) {
      console.error('❌ COD Order failed:', error);
      toast.error(error.message || 'Failed to place COD order. Check console for details.');
    } finally {
      setProcessing(false);
    }
  };

  const handleOnlinePayment = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    console.log('🟡 handleOnlinePayment called');
    
    // minimal client-side validation
    if (!cardName || !cardNumber || !expiry || !cvc) {
      alert('Please fill card details (this is a simulated payment)');
      return;
    }

    console.log('🚀 Starting Card order process...');
    setProcessing(true);
    toast.info('Processing card payment...');

    try {
      // Get user from context or localStorage
      const currentUser = JSON.parse(localStorage.getItem('chocoBissUser'));
      const userId = currentUser?.id || "guest-user-" + Date.now();

      // Prepare order data for backend - USE THE WORKING FORMAT
      const orderData = {
        user: userId,
        items: cart.map(item => ({
          product: item.id || `product-${Date.now()}`,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/default-image.jpg"
        })),
        totalAmount: totalAmount,
        paymentMethod: 'card',
        shippingAddress: {
          name: cardName,
          address: "Online Payment Address",
          locality: "Online",
          house: "N/A",
          pincode: "400001",
          district: "Thane",
          state: "Maharashtra",
          phone: "0000000000"
        }
      };

      console.log('📤 Sending card order to backend:', JSON.stringify(orderData, null, 2));

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      console.log('📥 Card response status:', response.status);

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Card Order created successfully');
        const id = result.order._id || result.order.orderId;
        setOrderId(id);
        setOrderPlaced(true);
        clearCart();
        localStorage.removeItem('paymentMethod');
        toast.success('Payment successful — order placed! 🎉');
      } else {
        console.log('❌ Card backend error:', result.message);
        throw new Error(result.message || 'Failed to create card order');
      }
    } catch (error) {
      console.error('❌ Card Order failed:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCodAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (orderPlaced) {
    useEffect(() => {
      const t = setTimeout(() => {
        localStorage.removeItem('paymentMethod');
        navigate('/');
      }, 3000);
      return () => clearTimeout(t);
    }, [navigate]);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your delicious chocolates are on their way!</p>
          {orderId && <p className="text-sm text-gray-700 mb-4">Order ID: <strong>{orderId}</strong></p>}
          <p className="text-sm text-gray-500 mb-4">Redirecting to home page...</p>
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
              <h3 className="text-xl font-bold mb-4">
                {paymentMethod === 'cod' ? 'Cash on Delivery Details' : 'Delivery Information'}
              </h3>
              
              {paymentMethod === 'cod' ? (
                // COD Address Form
                <div className="space-y-4">
                  <input 
                    type="text" 
                    name="name"
                    value={codAddress.name}
                    onChange={handleAddressChange}
                    placeholder="Full Name" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  
                  <input 
                    type="text" 
                    name="phone"
                    value={codAddress.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone Number" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  
                  <input 
                    type="text" 
                    name="address"
                    value={codAddress.address}
                    onChange={handleAddressChange}
                    placeholder="Street Address" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  
                  <input 
                    type="text" 
                    name="locality"
                    value={codAddress.locality}
                    onChange={handleAddressChange}
                    placeholder="Locality/Area" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  
                  <input 
                    type="text" 
                    name="house"
                    value={codAddress.house}
                    onChange={handleAddressChange}
                    placeholder="House No / Building Name" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="pincode"
                      value={codAddress.pincode}
                      onChange={handleAddressChange}
                      placeholder="Pincode" 
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                      required 
                    />
                    <input 
                      type="text" 
                      name="district"
                      value={codAddress.district}
                      onChange={handleAddressChange}
                      placeholder="District (Thane only)" 
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                      required 
                    />
                  </div>
                  
                  <input 
                    type="text" 
                    name="state"
                    value={codAddress.state}
                    onChange={handleAddressChange}
                    placeholder="State" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                    required 
                  />

                  <button 
                    type="button"
                    onClick={handleCODOrder}
                    disabled={processing}
                    className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors disabled:bg-gray-400"
                  >
                    {processing ? 'Placing Order...' : `Place COD Order - ${currency}${totalAmount}`}
                  </button>
                </div>
              ) : (
                // Card payment form
                <div className="space-y-4">
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

                  {/* Card details for online payment */}
                  <div className="mt-6 bg-rose-50 p-4 rounded">
                    <h4 className="font-semibold mb-3">Card Payment</h4>
                    <div className="space-y-3">
                      <input value={cardName} onChange={e => setCardName(e.target.value)} type="text" placeholder="Name on card" className="w-full border rounded-lg px-3 py-2" />
                      <input value={cardNumber} onChange={e => setCardNumber(e.target.value)} type="text" placeholder="Card number" className="w-full border rounded-lg px-3 py-2" />
                      <div className="grid grid-cols-2 gap-2">
                        <input value={expiry} onChange={e => setExpiry(e.target.value)} type="text" placeholder="MM/YY" className="border rounded-lg px-3 py-2" />
                        <input value={cvc} onChange={e => setCvc(e.target.value)} type="text" placeholder="CVC" className="border rounded-lg px-3 py-2" />
                      </div>
                      <button 
                        onClick={handleOnlinePayment} 
                        disabled={processing}
                        className="w-full bg-rose-600 text-white py-2 rounded disabled:bg-gray-400"
                      >
                        {processing ? 'Processing…' : `Pay ${currency}${totalAmount}`}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;