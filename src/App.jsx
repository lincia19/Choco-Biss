// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import CustomToastContainer from "./components/ToastContainer";
import ScrollToTop from "./components/ScrollToTop";

// Pages and Components
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Collection from "./pages/Collection";
import OrderSuccess from "./pages/OrderSuccess";
import CODDetails from "./pages/CODDetails";
import CardDetails from "./pages/CardDetails";
import Chatbot from "./components/Chatbot";
import { ShopContext } from "./context/ShopContext";



const App = () => {

  const{ user} = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-white">
      <CustomToastContainer />
      <Navbar />

      <main className="pt-32 min-h-screen">
        <ScrollToTop />

        <Routes>
          {/* 👇 Start app here */}
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/search" element={<Search />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/cod-details" element={<CODDetails />} />
          <Route path="/card-details" element={<CardDetails />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
