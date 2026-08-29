import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import API from "./api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        setProducts(response.data.products || []);
      } catch (error) {
        console.error(
          "Home products error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* HERO */}

      <section className="hero">
        <div>

          <p className="hero-small">
            WELCOME TO SHOPEASE
          </p>

          <h1>
            Everything You Need.
            <br />
            All in One Place.
          </h1>

          <p>
            Discover quality products at the best prices.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Shop Now →
          </Link>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="products-section">

        <div className="section-header">

          <div>

            <p className="section-small">
              OUR COLLECTION
            </p>

            <h2>
              Featured Products
            </h2>

          </div>

          <Link to="/products">
            View All →
          </Link>

        </div>

        {loading ? (
          <p>
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p>
            No products available.
          </p>
        ) : (
          <div className="products-grid">

            {products
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>
        )}

      </section>
    </>
  );
}

export default Home;
