// pages/Collection.jsx
import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { allProducts } = useContext(ShopContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    let result = [...allProducts]
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        (product.Name || product.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      result = result.filter(product => {
        const price = product.price || 0
        switch(priceFilter) {
          case 'under500':
            return price < 500
          case '500-1000':
            return price >= 500 && price <= 1000
          case 'over1000':
            return price > 1000
          default:
            return true
        }
      })
    }
    
    setFilteredProducts(result)
  }, [searchTerm, priceFilter, allProducts])

  console.log('Filtered Products:', filteredProducts)

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800 text-center w-full">Our Chocolate Collection</h1>
            <div className="w-48">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-500"
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="over1000">Over ₹1000</option>
              </select>
            </div>
          </div>
          <h5 className="text-gray-600 mx-auto text-lg text-center w-full block ">
            Discover our handcrafted chocolates made with love and the finest ingredients.
          </h5>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍫</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600">Check your product data configuration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product._id || index} className="bg-white p-2 rounded-lg">
                <ProductItem
                  id={product._id}
                  image={product.image && product.image[0] ? product.image[0] : '/placeholder.jpg'}
                  name={product.Name || product.name || `Product ${index + 1}`}
                  price={product.price || 0}
                />
                {/* Debug info */}
                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                  <p>ID: {product._id}</p>
                  <p>Name: {product.Name || 'No name'}</p>
                  <p>Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection