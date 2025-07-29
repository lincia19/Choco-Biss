import React from "react";
import { Routes, Route } from "react-router-dom";

// pages and components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import LatestCollection from './components/LatestCollection'; // ✅ imported title

const App = () => {
  return (
    <div className="min-h-screen bg-rose-50 p-6 mt-24 px-4">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Product/:productId" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>

      {/* 🔥 Show only the title here */}
      <LatestCollection />
    </div>
  );
};

export default App;
