import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

function Cart() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    loading,
  } = useCart();

  // Empty cart
  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-icon">
          🛒
        </div>

        <h1>
          Your Cart is Empty
        </h1>

        <p>
          Looks like you haven't added
          anything to your cart yet.
        </p>

        <Link
          to="/products"
          className="hero-button"
        >
          Start Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">

      {/* PAGE HEADING */}

      <div className="page-heading">
        <p>
          YOUR BAG
        </p>

        <h1>
          Shopping Cart
        </h1>
      </div>

      {/* LOADING */}

      {loading && (
        <p>
          Loading cart...
        </p>
      )}

      <div className="cart-layout">

        {/* CART ITEMS */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item._id}
            >

              {/* PRODUCT IMAGE */}

              <img
                src={item.image}
                alt={item.name}
              />

              {/* PRODUCT INFORMATION */}

              <div className="cart-item-info">

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{Number(
                    item.price || 0
                  ).toLocaleString()}
                </p>

                {/* QUANTITY */}

                <div className="quantity">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(
                        item._id
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(
                        item._id
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              {/* ITEM TOTAL */}

              <div className="item-total">

                <strong>
                  ₹{(
                    Number(item.price || 0) *
                    item.quantity
                  ).toLocaleString()}
                </strong>

              </div>

              {/* REMOVE */}

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeFromCart(
                    item._id
                  )
                }
              >
                Remove
              </button>

            </div>

          ))}

          {/* CLEAR CART */}

          <button
            type="button"
            className="clear-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>

        {/* ORDER SUMMARY */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {cart.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{cartTotal.toLocaleString()}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Shipping
            </span>

            <span>
              FREE
            </span>

          </div>

          <hr />

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{cartTotal.toLocaleString()}
            </strong>

          </div>

          {/* CHECKOUT */}

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout →
          </Link>

          {/* CONTINUE SHOPPING */}

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Cart;
