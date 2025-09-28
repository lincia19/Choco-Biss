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
  const [searchTerm, setSearchTerm] = useState('');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chocoBissCart');
    const savedUser = localStorage.getItem('chocoBissUser');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chocoBissCart', JSON.stringify(cart));
  }, [cart]);

  // Auth functions
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('chocoBissUser', JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name}! 🍫`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chocoBissUser');
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

  // Search and filter
  const filteredProducts = product.filter(p =>
    p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = {
    products: filteredProducts,
    allProducts: product,
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
    logout
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};