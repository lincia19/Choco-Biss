// components/Footer.jsx
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14">
          <div>
            <img src={assets.logo2} className='mb-5 w-32' alt="Choco Biss Logo" />
            <p className='w-full md:w-2/3 text-gray-300 leading-relaxed'>
              Our mission is simple: to bring joy, one chocolate at a time. Explore our bestsellers and discover your new favorite today!
            </p>
            <div className="flex space-x-4 mt-6">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white">📘</a>
                <a href="#" className="text-gray-400 hover:text-white">📷</a>
                <a href="#" className="text-gray-400 hover:text-white">🐦</a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📧 hello@chocobiss.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Sweet Street, Chocolate City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Choco Biss. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer