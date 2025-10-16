import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Order Placed Successfully!</h1>
      <button onClick={() => navigate("/")} className="bg-rose-500 text-white px-4 py-2 rounded mt-2">
        Back to Home
      </button>
    </div>
  );
}

export default OrderSuccess;
