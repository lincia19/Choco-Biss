import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("paymentMethod") || "";
    setPaymentMethod(stored);
  }, []);

  const handleSubmit = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    localStorage.setItem("paymentMethod", paymentMethod);

    // Navigate based on payment method
    if (paymentMethod === "cod") {
      navigate("/cod-details");
    } else if (paymentMethod === "card") {
      navigate("/card-details");
    }
  };

  const clearSelection = () => {
    localStorage.removeItem("paymentMethod");
    setPaymentMethod("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Select Payment Method
        </h2>

        {/* Modern Card-Style Options */}
        <div className="space-y-4">
          <div
            onClick={() => setPaymentMethod("cod")}
            className={`cursor-pointer rounded-lg p-4 border transition-all ${
              paymentMethod === "cod"
                ? "border-rose-500 bg-rose-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">Cash on Delivery</h3>
            <p className="text-gray-600 text-sm mt-1">
              Pay with cash at your doorstep
            </p>
          </div>

          <div
            onClick={() => setPaymentMethod("card")}
            className={`cursor-pointer rounded-lg p-4 border transition-all ${
              paymentMethod === "card"
                ? "border-rose-500 bg-rose-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">Card (Online)</h3>
            <p className="text-gray-600 text-sm mt-1">
              Pay securely using credit or debit card
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleSubmit}
              disabled={!paymentMethod}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                paymentMethod
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Proceed
            </button>

            <button
              onClick={clearSelection}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Clear
            </button>
          </div>

          {/* Current selection display */}
          <div className="mt-4 text-center text-gray-700">
            Current selection: <strong>{paymentMethod || "none"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
