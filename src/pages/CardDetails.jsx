import React, { useState } from "react";

const CardDetails = ({ onSubmit }) => {
  const [card, setCard] = useState({
    name: "Card Name",
    number: "**** **** **** ****",
    expiry: "MM/YY",
    cvv: "***",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only digits for number and CVV
    if ((name === "number" || name === "cvv") && !/^\d*$/.test(value)) return;

    // Limit lengths
    if (name === "number" && value.length > 16) return;
    if (name === "cvv" && value.length > 3) return;

    setCard({
      ...card,
      [name]:
        name === "number"
          ? value.replace(/(\d{4})/g, "$1 ").trim() || "**** **** **** ****"
          : name === "cvv"
          ? "***"
          : value || (name === "expiry" ? "MM/YY" : value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <div style={{ maxWidth: 400, margin: "30px auto", fontFamily: "Poppins, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #ff6b6b, #ff5252)",
          color: "#fff",
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 2, marginBottom: 15 }}>
          {card.number}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <span>{card.name}</span>
          <span>{card.expiry}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: 5, fontWeight: 500, color: "#555" }}>Name on Card</label>
        <input
          type="text"
          name="name"
          value={card.name === "Card Name" ? "" : card.name}
          onChange={handleChange}
          placeholder="Card Name"
          required
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ccc",
            outline: "none",
            fontSize: 15,
            marginBottom: 15,
          }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500, color: "#555" }}>Card Number</label>
        <input
          type="text"
          name="number"
          value={card.number === "**** **** **** ****" ? "" : card.number.replace(/\s/g, "")}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          required
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ccc",
            outline: "none",
            fontSize: 15,
            marginBottom: 15,
          }}
        />

        <div style={{ display: "flex", gap: 15 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: 5, fontWeight: 500, color: "#555" }}>Expiry</label>
            <input
              type="text"
              name="expiry"
              value={card.expiry === "MM/YY" ? "" : card.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              required
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #ccc",
                outline: "none",
                fontSize: 15,
              }}
            />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: 5, fontWeight: 500, color: "#555" }}>CVV</label>
            <input
              type="text"
              name="cvv"
              value={card.cvv === "***" ? "" : card.cvv}
              onChange={handleChange}
              placeholder="123"
              required
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #ccc",
                outline: "none",
                fontSize: 15,
              }}
            />
          </div>
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
            marginTop: 15,
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CardDetails;
