import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import API from "./api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        setProducts(response.data.products || []);
      } catch (error) {
        console.error(
          "Products error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="products-section">
        <div className="page-heading">
          <p>OUR COLLECTION</p>
          <h1>All Products</h1>
        </div>

        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-section">
        <div className="page-heading">
          <p>OUR COLLECTION</p>
          <h1>All Products</h1>
        </div>

        <p>
          ❌ {error}
        </p>
      </section>
    );
  }

  return (
    <section className="products-section">

      <div className="page-heading">
        <p>OUR COLLECTION</p>

        <h1>
          All Products
        </h1>
      </div>

      {products.length === 0 ? (
        <p>
          No products available.
        </p>
      ) : (
        <div className="products-grid">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default Products;
