// pages/Collection.jsx
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { allProducts } = useContext(ShopContext)

  console.log('All Products in Collection:', allProducts)

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Chocolate Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our handcrafted chocolates made with love and the finest ingredients.
          </p>
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍫</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600">Check your product data configuration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts.map((product, index) => (
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