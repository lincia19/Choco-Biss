// pages/Contact.jsx
import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="bg-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-600"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="bg-rose-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">📍 Address</h4>
                <p className="text-gray-600">123 Sweet Street, Chocolate City</p>
              </div>
              
              <div>
                <h4 className="font-semibold">📞 Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h4 className="font-semibold">📧 Email</h4>
                <p className="text-gray-600">hello@chocobiss.com</p>
              </div>
              
              <div>
                <h4 className="font-semibold">🕒 Hours</h4>
                <p className="text-gray-600">Monday - Saturday: 9AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact