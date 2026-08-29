import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);

      const response = await API.get("/cart");

      const items = response.data.cart || [];

      setCart(
        items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }))
      );
    } catch (error) {
      console.error(
        "Load cart error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item._id === product._id
        );

        if (existingProduct) {
          return prevCart.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      });

      return;
    }

    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      await loadCart();

      alert("Added to cart 🛒");
    } catch (error) {
      console.error(
        "Add cart error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to add product to cart"
      );
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart((prevCart) =>
        prevCart.filter(
          (item) => item._id !== productId
        )
      );

      return;
    }

    try {
      await API.delete(`/cart/${productId}`);

      await loadCart();
    } catch (error) {
      console.error(
        "Remove cart error:",
        error.response?.data || error.message
      );
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cart.find(
      (product) => product._id === productId
    );

    if (!item) return;

    await addToCart(item);
  };

  const decreaseQuantity = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item._id === productId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) => item.quantity > 0
          )
      );

      return;
    }

    const item = cart.find(
      (product) => product._id === productId
    );

    if (!item) return;

    if (item.quantity <= 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      await API.post("/cart", {
        productId,
        quantity: -1,
      });

      await loadCart();
    } catch (error) {
      console.error(
        "Decrease cart error:",
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      for (const item of cart) {
        await API.delete(`/cart/${item._id}`);
      }

      setCart([]);
    } catch (error) {
      console.error(
        "Clear cart error:",
        error.response?.data || error.message
      );
    }
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};

export default CartContext;
