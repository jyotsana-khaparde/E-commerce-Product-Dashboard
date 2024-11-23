import React, { useEffect, useRef, useState } from "react";

import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  // Fetch products from the API
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10&page=${page}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Observe the "load more" trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  // Fetch products whenever the page changes
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div className="product-list">
      {/* Product Grid */}
      <div className="product-list__grid">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}-${page}`}
            product={product}
            onViewDetails={(p) => console.log("Viewing product:", p)}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="product-list__loading">Loading...</div>}

      {/* Load More Trigger */}
      <div ref={observerRef} className="product-list__observer"></div>
    </div>
  );
};

export default ProductList;
