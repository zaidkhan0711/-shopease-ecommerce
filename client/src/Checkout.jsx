import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import API from "./api";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/orders");

      console.log("Order response:", response.data);

      navigate("/order-success", {
        state: {
          order: response.data.order,
          customer,
        },
      });

    } catch (error) {
      console.error(
        "Order error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-icon">🛒</div>

        <h1>Your Cart is Empty</h1>

        <p>
          Add some products before checking out.
        </p>

        <button
          className="hero-button"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="checkout-page">

      <div className="page-heading">
        <p>CHECKOUT</p>
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-layout">

        {/* CUSTOMER INFORMATION */}

        <div className="checkout-form">

          <h2>Delivery Information</h2>

          <form onSubmit={handlePlaceOrder}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={customer.phone}
              onChange={handleChange}
              required
            />

            <label>
              Address
            </label>

            <textarea
              name="address"
              placeholder="House number, street, area"
              value={customer.address}
              onChange={handleChange}
              required
            />

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
              required
            />

            <label>
              PIN Code
            </label>

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={customer.pincode}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="checkout-button"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Place Order →"}
            </button>

          </form>

        </div>

        {/* ORDER SUMMARY */}

        <div className="cart-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="summary-row"
              key={item._id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{(
                  Number(item.price) *
                  item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>
              Shipping
            </span>

            <span>
              FREE
            </span>
          </div>

          <div className="summary-total">
            <span>
              Total
            </span>

            <strong>
              ₹{cartTotal.toLocaleString()}
            </strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;
