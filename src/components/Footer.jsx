import React from 'react'
import { assets } from '../assets/assets'; // adjust path if needed


const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
            <img src={assets.logo2} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Our mission is simple: to bring joy, one chocolate at a time. Explore our bestsellers and discover your new favorite today!
                </p>
            
        </div>
      </div>
    </div>
  )
}

export default Footer
