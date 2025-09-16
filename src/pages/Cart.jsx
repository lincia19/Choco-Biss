import React from "react";
import { product } from "../assets/assets"; // ✅ Import products

const Cart = () => {
  // For now, hardcode 2 items (later you can make this dynamic)
  const cartItems = [product[0], product[1]]; // Banana Stick Chocolate + Brownie

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            {/* ✅ Smaller Square Image */}
            <div className="w-32 aspect-square overflow-hidden rounded-md">
              <img
                src={item.image[0]}
                alt={item.Name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-2 font-semibold">{item.Name}</p>
            <p className="text-sm text-gray-600 text-center">{item.description}</p>
            <p className="mt-1 font-bold">₹{item.price}</p>
            <button className="mt-3 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
