import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Save selected payment method to localStorage or pass to PlaceOrder
    localStorage.setItem("paymentMethod", paymentMethod);

    // Redirect to PlaceOrder page
    navigate("/placeorder");
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <label>
        <input
          type="radio"
          name="payment"
          value="cod"
          onChange={() => setPaymentMethod("cod")}
        />{" "}
        Cash on Delivery
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="payment"
          value="online"
          onChange={() => setPaymentMethod("online")}
        />{" "}
        Online Payment
      </label>
      <br />
      <button onClick={handleSubmit}>Proceed</button>
    </div>
  );
}

export default Payment;
