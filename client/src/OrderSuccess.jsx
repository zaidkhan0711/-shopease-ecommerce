import React from "react";
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;
  const customer = location.state?.customer;

  return (
    <section className="order-success">

      <div className="success-box">

        <div className="success-icon">
          ✓
        </div>

        <p className="section-small">
          ORDER CONFIRMED
        </p>

        <h1>
          Thank You for Your Order! 🎉
        </h1>

        <p>
          Your order has been successfully placed.
        </p>

        {order && (
          <div className="order-info">

            <div>
              <span>Order ID</span>

              <strong>
                {order._id}
              </strong>
            </div>

            <div>
              <span>Total</span>

              <strong>
                ₹{Number(
                  order.totalPrice || 0
                ).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Status</span>

              <strong>
                {order.status || "Pending"}
              </strong>
            </div>

          </div>
        )}

        {customer && (
          <div className="delivery-info">

            <h3>
              Delivery Address
            </h3>

            <p>
              {customer.name}
            </p>

            <p>
              {customer.phone}
            </p>

            <p>
              {customer.address}
            </p>

            <p>
              {customer.city} - {customer.pincode}
            </p>

          </div>
        )}

        <div className="success-actions">

          <Link
            to="/products"
            className="hero-button"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="secondary-button"
          >
            View My Orders
          </Link>

        </div>

      </div>

    </section>
  );
}

export default OrderSuccess;
