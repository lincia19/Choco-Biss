// pages/Orders.jsx
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
  const { orders } = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {(!orders || orders.length === 0) ? (
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
                    <p className="text-gray-600 text-sm">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Items: {order.items ? order.items.length : 0}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'paid' || order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <p className="font-semibold">{order.currency}{order.amount}</p>
                    {order.paymentInfo && (
                      <p className="text-sm text-gray-600">Paid with card ending {order.paymentInfo.last4}</p>
                    )}
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <button className="text-rose-500 hover:text-rose-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Expandable items list could be added here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders