// context/ShopContext.jsx
import { createContext, useState, useEffect } from "react";
import { product } from "../assets/assets";
import { toast } from 'react-toastify';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = '₹';
  const delivery_fee = 10;
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  // Function to sync frontend products to MongoDB
// In your ShopContext.jsx - UPDATE the sync function
const syncProductsToMongoDB = async (products) => {
  try {
    // Transform the products before sending to fix data types
    const transformedProducts = products.map(product => ({
      ...product,
      // Ensure stockQuantity is a number, not an array
      stockQuantity: Array.isArray(product.stockQuantity) ? product.stockQuantity[0] || 50 : product.stockQuantity,
      // Ensure price is a number
      price: Array.isArray(product.price) ? product.price[0] || 0 : product.price,
      // Ensure originalPrice is a number
      originalPrice: Array.isArray(product.originalPrice) ? product.originalPrice[0] || 0 : product.originalPrice
    }));

    const response = await fetch('http://localhost:5000/api/products/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products: transformedProducts })
    });
    
    const result = await response.json();
    console.log('🔄 Products synced to MongoDB:', result);
    return result;
  } catch (error) {
    console.error('❌ Error syncing products:', error);
  }
};

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chocoBissCart');
    const savedUser = localStorage.getItem('chocoBissUser');
    const savedOrders = localStorage.getItem('chocoBissOrders');
    const savedToken = localStorage.getItem('token');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    console.log('🔄 ShopContext Loaded - Token exists:', !!savedToken);
    console.log('🔄 ShopContext Loaded - User exists:', !!savedUser);
    
    // Use local products only for now to fix the issue
    setProducts(product);
    console.log('📦 Using local products to ensure images work');

    // Sync products to MongoDB when component loads
    syncProductsToMongoDB(product);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chocoBissCart', JSON.stringify(cart));
  }, [cart]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('chocoBissOrders', JSON.stringify(orders));
  }, [orders]);

  // Auth functions - UPDATED
  const login = async (userData) => {
    try {
      console.log('🔐 Frontend Login - Starting login process');
      console.log('🔐 Frontend Login - Email:', userData.email);
      
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        }),
      });

      console.log('🔐 Frontend Login - Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('🔐 Frontend Login - Success, data received:', data);
        
        const userInfo = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.token // Make sure token is included
        };
        
        // Store both user data AND token
        setUser(userInfo);
        localStorage.setItem('chocoBissUser', JSON.stringify(userInfo));
        localStorage.setItem('token', data.token); // ✅ Store token separately
        
        console.log('✅ Frontend Login - User and token stored');
        console.log('✅ Token stored:', data.token);
        console.log('✅ User stored:', userInfo);
        
        toast.success(`Welcome back, ${data.user.name}! 🍫`);
        
        return true; // Return success
      } else {
        const errorData = await response.json();
        console.log('❌ Frontend Login - API error:', errorData);
        toast.error(errorData.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.log('❌ Frontend Login - Network error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chocoBissUser');
    localStorage.removeItem('token'); // Also remove token
    toast.info('Logged out successfully');
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product._id);
      
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item.id === product._id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Added more ${product.Name} to cart!`);
        return updatedCart;
      } else {
        const newCart = [...prevCart, {
          id: product._id,
          name: product.Name,
          image: product.image[0],
          price: product.price,
          quantity: quantity
        }];
        toast.success(`${product.Name} added to cart! 🛒`);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      toast.info('Item removed from cart');
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Save order to backend database - UPDATED with debugging
  const saveOrderToBackend = async (orderData) => {
    try {
      // Debug: Check what's in localStorage
      console.log('🔍 Order Debug - localStorage contents:');
      console.log('🔍 token:', localStorage.getItem('token'));
      console.log('🔍 chocoBissUser:', localStorage.getItem('chocoBissUser'));
      console.log('🔍 Current user state:', user);

      const token = localStorage.getItem('token');
      const currentUser = JSON.parse(localStorage.getItem('chocoBissUser'));
      
      if (!token) {
        console.log('❌ No JWT token found in localStorage');
        console.log('❌ Available localStorage keys:', Object.keys(localStorage));
        toast.error('Please login to place an order');
        return null;
      }

      if (!currentUser) {
        console.log('❌ No user data found');
        toast.error('User not found. Please login again.');
        return null;
      }

      const orderPayload = {
        items: cart.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: getCartTotal() + delivery_fee,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress || {},
        userId: currentUser.id
      };

      console.log('🛒 Frontend Debug - Order payload:', orderPayload);
      console.log('🛒 Frontend Debug - API URL:', `${API_BASE}/orders`);
      console.log('🛒 Frontend Debug - Token being sent:', token);

      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });
      
      console.log('🛒 Frontend Debug - Response status:', response.status);
      console.log('🛒 Frontend Debug - Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Frontend Debug - Order saved successfully:', data);
        toast.success('Order placed successfully! 🎉');
        return data.order;
      } else {
        const errorText = await response.text();
        console.log('❌ Frontend Debug - API error:', errorText);
        
        // Try to parse error message
        try {
          const errorData = JSON.parse(errorText);
          toast.error(errorData.message || 'Failed to save order');
        } catch {
          toast.error('Failed to save order to server');
        }
        return null;
      }
    } catch (error) {
      console.log('❌ Frontend Debug - Network error:', error);
      toast.error('Network error. Please check your connection.');
      return null;
    }
  };

  // Orders: save an order locally AND to backend. Returns generated orderId.
  const saveOrder = async (orderData) => {
    const orderId = `ORD-${Date.now()}`;
    const newOrder = {
      id: orderId,
      items: cart,
      amount: getCartTotal() + delivery_fee,
      currency,
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    
    // Save locally (your existing flow)
    setOrders(prev => [newOrder, ...prev]);
    
    // NEW: Also save to backend database
    const backendOrder = await saveOrderToBackend(orderData);
    if (backendOrder) {
      console.log('✅ Order saved to both local and backend');
      // Clear cart after successful order
      clearCart();
    } else {
      console.log('⚠️ Order saved locally only (backend failed)');
      toast.info('Order saved locally. Please check your connection.');
    }
    
    return orderId;
  };

  const getOrders = () => orders;

  // Search and filter - USING LOCAL PRODUCTS
  const filteredProducts = products.filter(p =>
    p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = {
    products: filteredProducts,
    allProducts: products, // Using the products state (which is set to local products)
    currency,
    delivery_fee,
    cart,
    user,
    searchTerm,
    setSearchTerm,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    login,
    logout,
    saveOrder, 
    getOrders, 
    orders,
    loading,
    syncProductsToMongoDB // Added the sync function to context value
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};