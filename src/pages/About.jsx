// pages/About.jsx
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Choco Biss</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded with a passion for creating unforgettable chocolate experiences, 
              Choco Biss brings you handcrafted chocolates made with love and the finest 
              ingredients. Each piece tells a story of craftsmanship and dedication.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To spread joy and create memorable moments through our delicious, 
              handcrafted chocolates. We believe every bite should be a celebration.
            </p>
          </div>
          
          <div className="bg-rose-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">✅ Handcrafted with love</li>
              <li className="flex items-center">✅ Premium ingredients</li>
              <li className="flex items-center">✅ Fresh daily delivery</li>
              <li className="flex items-center">✅ 100% satisfaction guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About