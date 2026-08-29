import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully.");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        ShopEase 🛒
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart 🛒

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </Link>

        {!token ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
