// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomToastContainer from './components/ToastContainer';

// Pages and Components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from './pages/Search';
import Collection from './pages/Collection';
import OrderSuccess from "./pages/OrderSuccess";
import CODDetails from "./pages/CODDetails";
import CardDetails from "./pages/CardDetails";


      
   




const App = () => {
  return (
    <div className="min-h-screen bg-white"> {/* Changed from bg-rose-50 to bg-white */}
      <CustomToastContainer />
      <Navbar />
      
      <main className="pt-32 min-h-screen"> {/* Increased padding for navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/OrderSuccess" element={<OrderSuccess />} />
          <Route path="/cod-details" element={<CODDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/card-details" element={<CardDetails />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;