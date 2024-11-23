import React, { useEffect, useRef, useState } from "react";

import { Loader } from "./Loader";
import ProductCard from "./ProductCard";
import api from "../utils/api";

// import axios from "../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/products"); // Adjust endpoint if needed
        console.log("Products fetched:", response.data);

        setProducts((prev) => [...prev, ...response.data]);
        // setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {loading && <Loader />}
      {/* <div ref={loaderRef}></div> */}
    </div>
  );
};

export default ProductList;
