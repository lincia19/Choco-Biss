import React, { useState } from 'react';
import logo2 from '../assets/logo2.png';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <div className="fixed top-0 right-0 z-50 bg-gray-100 shadow-md w-full">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between pr-6 pl-2 py-4">

        {/* Logo */}
        <div className="ml-0">
          <Link to='/'><img src={logo2} className="w-20 h-auto object-contain" alt="Logo2" /></Link>
        </div>

        {/* Navbar Right Section */}
        <div className="flex items-center space-x-6">

          {/* Search Box */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
            <img src={assets.search1} className="w-7 h-7 cursor-pointer" alt="search icon" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent text-sm text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <img
              className="w-12 h-12 cursor-pointer rounded-full border-gray-300"
              src={assets.profile_icon}
              alt="Profile Icon"
              onClick={() => setProfileDropdown(!profileDropdown)}
            />
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
  <img src={assets.cart_icon} className="w-13 min-w-13" alt="Cart Icon" />
  <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">2</p>
</Link>


          {/* Hamburger Menu */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-10 h-10 cursor-pointer'
            alt="Menu Icon"
          />
        </div>

        {/* Sidebar Menu */}
        <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${visible ? 'w-64 p-6' : 'w-0 overflow-hidden'}`}>
          <button onClick={() => setVisible(false)} className="text-black mb-4 text-lg">✖ Close</button>

          <nav className="flex flex-col space-y-4">
            <NavLink onClick={() => setVisible(false)} to="/" className="py-2 border-b hover:text-pink-600">Home</NavLink>
<NavLink onClick={() => setVisible(false)} to="/collection" className="py-2 border-b hover:text-pink-600">Collection</NavLink>
<NavLink onClick={() => setVisible(false)} to="/about" className="py-2 border-b hover:text-pink-600">About</NavLink>
<NavLink onClick={() => setVisible(false)} to="/contact" className="py-2 border-b hover:text-pink-600">Contact</NavLink>

          </nav>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
