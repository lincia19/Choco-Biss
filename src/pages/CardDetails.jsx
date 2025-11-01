import React, { useState } from "react";

const CheckoutPage = () => {
  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    // Only digits for number and CVV
    if ((name === "number" || name === "cvv") && !/^\d*$/.test(value)) return;

    // Limit lengths
    if (name === "number" && value.length > 16) return;
    if (name === "cvv" && value.length > 3) return;

    setCard({
      ...card,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can later connect this to backend or Razorpay
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Poppins, sans-serif" }}>
        <h2 style={{ color: "#4BB543" }}>🎉 Order Placed Successfully!</h2>
        <p>Thank you for shopping with <strong>Choco-Biss</strong> 🍫</p>
        <p>Your chocolates will arrive soon!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#ff5252", marginBottom: 20 }}>Checkout</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        {/* Personal Details */}
        <h3 style={{ marginBottom: 10, color: "#333" }}>Personal Information</h3>

        <input
          type="text"
          name="fullName"
          value={personal.fullName}
          onChange={handlePersonalChange}
          placeholder="Full Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={personal.email}
          onChange={handlePersonalChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          value={personal.phone}
          onChange={handlePersonalChange}
          placeholder="Phone Number"
          required
          style={inputStyle}
        />
        <textarea
          name="address"
          value={personal.address}
          onChange={handlePersonalChange}
          placeholder="Full Address"
          required
          rows="3"
          style={{ ...inputStyle, resize: "none" }}
        ></textarea>

        {/* Card Details */}
        <h3 style={{ margin: "20px 0 10px", color: "#333" }}>Card Details</h3>

        <input
          type="text"
          name="name"
          value={card.name}
          onChange={handleCardChange}
          placeholder="Name on Card"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="number"
          value={card.number}
          onChange={handleCardChange}
          placeholder="1234 5678 9012 3456"
          required
          style={inputStyle}
        />
        <div style={{ display: "flex", gap: 15 }}>
          <input
            type="text"
            name="expiry"
            value={card.expiry}
            onChange={handleCardChange}
            placeholder="MM/YY"
            required
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            type="text"
            name="cvv"
            value={card.cvv}
            onChange={handleCardChange}
            placeholder="CVV"
            required
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 20,
            transition: "0.3s",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

// Common input style
const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 15,
  marginBottom: 15,
};

export default CheckoutPage;
