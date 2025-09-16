import React from "react";
import { Routes, Route } from "react-router-dom";

// pages and components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import LatestCollection from './components/LatestCollection'; 
import Footer from './components/Footer';
import Search from './pages/Search';   // 🔍 new search page

const App = () => {
  return (
    <div className="min-h-screen bg-rose-50 p-6 mt-24 px-4">
      {/* Navbar always on top */}
      <Navbar />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Product Detail View */}
        <Route path="/product/:productId" element={<Product />} />

        {/* ✅ Cart / Orders */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />

        {/* ✅ User Authentication */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Search + Filter */}
        <Route path="/search" element={<Search />} />
      </Routes>

      {/* Footer always at bottom */}
      <Footer />

      {/* 🔥 Show LatestCollection heading (if you want only title on homepage, move this inside Home.jsx) */}
      <LatestCollection />
    </div>
  );
};

export default App;
