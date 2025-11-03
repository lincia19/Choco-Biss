import React, { useState } from "react";

const CashOnDelivery = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    locality: "",
    house: "",
    pincode: "",
    district: "",
    state: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only digits for pincode
    if (name === "pincode" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
    setError(""); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if district is Thane
    if (form.district.trim().toLowerCase() !== "thane") {
      setError("Order cannot be placed outside Thane district.");
      return;
    }
    setError("");
    onSubmit(form); // proceed with order
  };

  return (
    <div style={{ maxWidth: 450, margin: "30px auto", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Cash on Delivery</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: 5, fontWeight: 500 }}>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500 }}>Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Street Address"
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500 }}>Locality</label>
        <input
          type="text"
          name="locality"
          value={form.locality}
          onChange={handleChange}
          placeholder="Locality"
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500 }}>House No / Name</label>
        <input
          type="text"
          name="house"
          value={form.house}
          onChange={handleChange}
          placeholder="House No / Name"
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500 }}>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="411001"
          required
          maxLength={6}
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500 }}>District</label>
        <input
          type="text"
          name="district"
          value={form.district}
          onChange={handleChange}
          placeholder="Thane"
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        <label style={{ marginBottom: 5, fontWeight: 500 }}>State</label>
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="Maharashtra"
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15 }}
        />

        {error && <div style={{ color: "red", marginBottom: 15 }}>{error}</div>}

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
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CashOnDelivery;
