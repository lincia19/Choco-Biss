// components/Navbar.jsx
import React, { useState, useContext } from 'react';
import logo2 from '../assets/logo2.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const { user, logout, searchTerm, setSearchTerm, getCartItemCount } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/search');
      setSearchVisible(false);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
  };

  console.log(user);

  return (
    <div className="fixed top-0 right-0 z-50 bg-white shadow-md w-full">
      <div className="max-w-screen-xl flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to='/' onClick={() => setVisible(false)}>
            <img src={logo2} className="w-20 h-auto object-contain" alt="Choco Biss Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center space-x-8">
          <NavLink to="/" className="text-gray-700 hover:text-rose-600 font-medium">Home</NavLink>
          <NavLink to="/collection" className="text-gray-700 hover:text-rose-600 font-medium">Collection</NavLink>
          <NavLink to="/about" className="text-gray-700 hover:text-rose-600 font-medium">About</NavLink>
          <NavLink to="/contact" className="text-gray-700 hover:text-rose-600 font-medium">Contact</NavLink>
        </nav>

        {/* Navbar Right Section */}
        <div className="flex items-center space-x-4 sm:space-x-6">

          {/* Search - Desktop */}
          <div className="hidden sm:flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 bg-white">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Search chocolates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none bg-transparent text-sm text-gray-800 placeholder-gray-500 w-32 sm:w-40"
              />
              <button type="submit">
                <img src={assets.search1} className="w-8 h-8 cursor-pointer" alt="Search" />
              </button>
            </form>
          </div>

          {/* Search - Mobile */}
          <button 
            className="sm:hidden"
            onClick={() => setSearchVisible(!searchVisible)}
          >
            <img src={assets.search1} className="w-8 h-8" alt="Search" />
          </button>

          {/* Profile */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <img
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    src={user.avatar || assets.profile_icon}
                    alt="Profile"
                  />
                </button>-
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">Hi, {user.name}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-rose-600">
                Login
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-8 h-8" alt="Cart" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setVisible(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menu"
          >
            <img src={assets.menu_icon} className="w-6 h-6" alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchVisible && (
        <div className="sm:hidden bg-white border-t px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search chocolates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none bg-gray-100 rounded-full px-4 py-2 text-sm"
            />
            <button type="submit" className="p-2">
              <img src={assets.search1} className="w-5 h-5" alt="Search" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-all duration-300 z-50 md:hidden ${visible ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className="p-6">
          <button 
            onClick={() => setVisible(false)}
            className="absolute top-4 right-4 text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button>

          <nav className="flex flex-col space-y-6 mt-8">
            <NavLink to="/" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">Home</NavLink>
            <NavLink to="/collection" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">Collection</NavLink>
            <NavLink to="/about" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">About</NavLink>
            <NavLink to="/contact" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">Contact</NavLink>
            
            {user ? (
              <>
                <NavLink to="/profile" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">Profile</NavLink>
                <NavLink to="/orders" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">Orders</NavLink>
                <button onClick={handleLogout} className="text-lg font-medium py-2 border-b text-left">Logout</button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setVisible(false)} className="text-lg font-medium py-2 border-b">Login</NavLink>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default Navbar;