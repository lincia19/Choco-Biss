// pages/Login.jsx
import React, { useState, useContext } from "react";
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    
    if (email && password) {
      // Mock user data - in real app, this would come from your auth API
      const userData = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        avatar: null
      };
      
      login(userData);
      navigate('/');
    } else {
      alert("⚠️ Please fill in all fields");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = signupData;

    if (password !== confirm) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    if (name && email && password) {
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: null
      };
      
      login(userData);
      setActiveTab("login");
      navigate('/');
    } else {
      alert("⚠️ Please fill in all fields");
    }
  };

  return (
    <div className="container">
      {/* ... rest of your existing Login.jsx code ... */}
      {/* Just update the form onSubmit handlers to use the new functions */}
    </div>
  );
};

export default Login;