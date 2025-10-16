// pages/PlaceOrder.jsx
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, getCartTotal, delivery_fee, currency, clearCart, saveOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const totalAmount = getCartTotal() + delivery_fee;

  // Ensure payment method chosen; otherwise auto-redirect to Payment selection after a short delay
  const paymentMethod = localStorage.getItem('paymentMethod');

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

  const handlePlaceOrder = async () => {
    // Only allow this for Cash on Delivery
    if (paymentMethod !== 'cod') {
      alert('Please complete the online payment form.');
      return;
    }

    console.log('handlePlaceOrder: starting COD flow');
    setProcessing(true);
    toast.info('Processing order...');
    const id = saveOrder({ paymentMethod: 'cod', status: 'paid' });
    console.log('handlePlaceOrder: saved order id=', id);
    setTimeout(() => {
      setProcessing(false);
      setOrderPlaced(true);
      setOrderId(id);
      clearCart();
      // keep paymentMethod until success UI is shown; remove after redirect to home
      toast.success('Order placed successfully');
    }, 1200);
  };

  const handleOnlinePayment = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // minimal client-side validation
    if (!cardName || !cardNumber || !expiry || !cvc) {
      alert('Please fill card details (this is a simulated payment)');
      return;
    }

    console.log('handleOnlinePayment: card data provided, starting simulated payment');
    setProcessing(true);
    toast.info('Processing card payment...');

    // simulate contacting payment provider
    setTimeout(() => {
      const id = saveOrder({ paymentMethod: 'card', status: 'paid', paymentInfo: { cardName, last4: cardNumber.slice(-4) } });
      console.log('handleOnlinePayment: saved order id=', id);
      setProcessing(false);
      setOrderPlaced(true);
      setOrderId(id);
      clearCart();
      // clear stored payment method
      localStorage.removeItem('paymentMethod');
      toast.success('Payment successful — order placed');
    }, 1600);
  };

  if (orderPlaced) {
    // after showing success, navigate to home automatically after a short delay
    useEffect(() => {
      const t = setTimeout(() => {
        localStorage.removeItem('paymentMethod');
        navigate('/');
      }, 1800);
      return () => clearTimeout(t);
    }, [navigate]);
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your delicious chocolates are on their way!</p>
          {orderId && <p className="text-sm text-gray-700 mb-4">Order ID: <strong>{orderId}</strong></p>}
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
      {/* Debug panel - visible in UI to help troubleshooting */}
      <div style={{position: 'fixed', right: 12, bottom: 12, background: 'rgba(255,255,255,0.95)', border: '1px solid #eee', padding: 12, borderRadius: 8, zIndex: 9999, width: 220}}>
        <div style={{fontSize:12, color:'#111', marginBottom:6, fontWeight:700}}>Debug</div>
        <div style={{fontSize:12}}>paymentMethod: <strong>{paymentMethod || 'none'}</strong></div>
        <div style={{fontSize:12}}>processing: <strong>{String(processing)}</strong></div>
        <div style={{fontSize:12}}>orderPlaced: <strong>{String(orderPlaced)}</strong></div>
        <div style={{fontSize:12}}>orderId: <strong>{orderId || '-'}</strong></div>
        <div style={{fontSize:12}}>cart items: <strong>{cart ? cart.length : 0}</strong></div>
      </div>
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
                  onClick={() => {
                    if (paymentMethod === 'cod') {
                      handlePlaceOrder();
                    } else {
                      handleOnlinePayment();
                    }
                  }}
                  className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors"
                >
                  Place Order - {currency}{totalAmount}
                </button>
              </form>

              {/* If user selected card payment, show simple card form */}
              {paymentMethod === 'card' && (
                <div className="mt-6 bg-rose-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Card Payment (simulated)</h4>
                  <form onSubmit={handleOnlinePayment} className="space-y-3">
                    <input value={cardName} onChange={e => setCardName(e.target.value)} type="text" placeholder="Name on card" className="w-full border rounded-lg px-3 py-2" />
                    <input value={cardNumber} onChange={e => setCardNumber(e.target.value)} type="text" placeholder="Card number (use any digits)" className="w-full border rounded-lg px-3 py-2" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={expiry} onChange={e => setExpiry(e.target.value)} type="text" placeholder="MM/YY" className="border rounded-lg px-3 py-2" />
                      <input value={cvc} onChange={e => setCvc(e.target.value)} type="text" placeholder="CVC" className="border rounded-lg px-3 py-2" />
                    </div>
                    <button disabled={processing} type="submit" className="w-full bg-rose-600 text-white py-2 rounded">{processing ? 'Processing…' : `Pay ${currency}${totalAmount}`}</button>
                  </form>
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