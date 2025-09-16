// src/pages/Login.jsx
import React, { useState } from "react";
import "./Login.css"; // we’ll move styles separately

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email && password) {
      alert("✅ Login successful! Welcome back to Sweet Delights Bakery 🎂");
      onLogin(); // move into main app after login
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
      alert("🎉 Account created successfully! Welcome to our bakery family 🧁");
      setActiveTab("login"); // switch back to login after signup
    } else {
      alert("⚠️ Please fill in all fields");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Choco Biss</h1>
        <p>Delivering happiness, one treat at a time</p>
      </div>

      <div className="content">
        {/* Left side banner */}
        <div className="banner">
          <h2>Welcome to our Choco Biss family!</h2>
          <p>
            Sign in or create an account to enjoy our delicious treats and get
            exclusive offers.
          </p>
        </div>

        {/* Right side form */}
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
          {activeTab === "login" && (
            <form className="form active" onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="mclegacy@gmail.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me logged in</label>
              </div>

              <button type="submit" className="submit-btn">
                Login to your account
              </button>

              <div className="divider">
                <span>Or login with</span>
              </div>

              <div className="social-login">
                <div className="social-btn">
                  <i className="fab fa-google"></i>
                </div>
                <div className="social-btn">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="social-btn">
                  <i className="fab fa-apple"></i>
                </div>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form className="form active" onSubmit={handleSignup}>
              <div className="input-group">
                <label>Full Name</label>
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={signupData.confirm}
                  onChange={(e) =>
                    setSignupData({ ...signupData, confirm: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Create Account
              </button>

              <div className="divider">
                <span>Or sign up with</span>
              </div>

              <div className="social-login">
                <div className="social-btn">
                  <i className="fab fa-google"></i>
                </div>
                <div className="social-btn">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="social-btn">
                  <i className="fab fa-apple"></i>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="footer">
        <p>
          By continuing, you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>

      <div className="cookie"></div>
      <div className="cupcake"></div>
    </div>
  );
};

export default Login;
