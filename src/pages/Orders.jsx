// pages/Orders.jsx
import React from 'react'

const Orders = () => {
  // Mock orders data
  const orders = [
    { id: '#CB001', date: '2024-01-15', total: 1250, status: 'Delivered' },
    { id: '#CB002', date: '2024-01-10', total: 890, status: 'Processing' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-600">Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">Order {order.id}</h3>
                    <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">₹{order.total}</span>
                  <button className="text-rose-500 hover:text-rose-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders