import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-green-600 animate-bounce">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for shopping with <span className="font-semibold text-rose-500">Choco-Biss</span> 🍫  
          Your order will arrive soon!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-transform transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
