import React, { useEffect, useRef, useState } from "react";

import FilterSortBar from "./FilterSortBar";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sort, setSort] = useState("price-asc");

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const observerRef = useRef(null);
  const [error, setError] = useState(null); // Error state

  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const applyFiltersAndSort = () => {
    let updatedProducts = [...products];

    // Apply filters
    let filtered = [];
    if (filters.category) {
      filtered = updatedProducts.filter((product) =>
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.minPrice) {
      filtered = updatedProducts.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = updatedProducts.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    updatedProducts = filtered.length ? filtered : updatedProducts;

    // Apply sorting
    if (sort === "price-asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "rating-desc") {
      updatedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sort]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="product-list">
      <FilterSortBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading Spinner */}
      {loading && page === 1 && (
        <div className="product-list__loading">Loading products...</div>
      )}

      {/* Product Grid */}
      <div className="product-list__grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${page}-${index}`}
            product={product}
            onProductClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {loading && page > 1 && (
        <div className="product-list__loading">Loading more products...</div>
      )}

      {/* Load More Trigger */}
      <div ref={observerRef} className="product-list__observer"></div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          productId={selectedProductId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;
