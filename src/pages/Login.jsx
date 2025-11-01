// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
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
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user,login } = useContext(ShopContext);

  // Handle login - UPDATED with backend integration
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    
    if (!email || !password) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const success = await login({ email, password });
      if (success) {
        navigate("/home");
      }
    } catch (error) {
      // Error is handled in the context
    } finally {
      setLoading(false);
    }
  };

  // Handle signup - UPDATED with backend integration
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = signupData;
    
    if (password !== confirm) {
      alert("⚠️ Passwords do not match!");
      return;
    }
    
    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // After successful signup, automatically log them in
        const success = await login({ email, password });
        if (success) {
          alert("Account created successfully!");
          setActiveTab("login");
          setSignupData({ name: "", email: "", password: "", confirm: "" });
          navigate("/home");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Signup failed!");
      }
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🍫 Choco-Biss</h1>
        <p>Sweeten your day with every bite!</p>
      </div>

      <div className="content">
        <div className="banner">
          <h2>Welcome Back!</h2>
          <p>Log in or sign up to explore our chocolate world.</p>
        </div>

        <div className="form-container">
          {/* Tabs */}
          <div className="tabs">
            <div
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </div>
            <div
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </div>
          </div>

          {/* Login Form */}
          <form
            className={`form ${activeTab === "login" ? "active" : ""}`}
            onSubmit={handleLogin}
          >
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Form */}
          <form
            className={`form ${activeTab === "signup" ? "active" : ""}`}
            onSubmit={handleSignup}
          >
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={signupData.confirm}
                onChange={(e) =>
                  setSignupData({ ...signupData, confirm: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      <div className="footer">
        <p>
          © 2025 Choco-Biss. Made with 🍫 and ❤️
        </p>
      </div>
    </div>
  );
};

export default Login;