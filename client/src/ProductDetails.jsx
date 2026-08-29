import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import API from "./api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (err) {
        console.error("Product details error:", err);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "50px" }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: "50px" }}>
        <h2>{error || "Product not found."}</h2>
      </div>
    );
  }

  return (
    <section className="product-details">
      <div>
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div>
        <span className="category">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <h2>
          ₹{Number(product.price).toLocaleString("en-IN")}
        </h2>

        <p>{product.description}</p>

        <p>
          Stock: {product.stock}
        </p>

        <button
          onClick={() => addToCart(product)}
        >
          Add to Cart 🛒
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;

