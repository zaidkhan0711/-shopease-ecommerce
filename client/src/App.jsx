import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./Navbar";

import Home from "./Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

import Login from "./Login";
import Register from "./Register";

import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>

      <CartProvider>

        <Navbar />

        <main>

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

          </Routes>

        </main>

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;
