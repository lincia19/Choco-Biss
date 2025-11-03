import React from 'react'

const ourpolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
      
      <div> 
        <img src={assets.exchange} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'> Easy excahnge Policy</p>
        <p className='text-gray-400'>We Offer free Exchange Policy</p>
      </div>
    </div>
  )
}

export default ourpolicies
