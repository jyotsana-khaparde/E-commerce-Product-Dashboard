import React, { useEffect, useRef, useState } from "react";

import FilterSortBar from "./FilterSortBar";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]); // All loaded products
  const [filteredProducts, setFilteredProducts] = useState([]); // Displayed products after filtering/sorting
  const [page, setPage] = useState(1); // Current page for infinite scroll
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Flag for more products
  const [error, setError] = useState(null); // Error message state

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  }); // Filter state
  const [sort, setSort] = useState("price-asc"); // Sorting state

  const [selectedProductId, setSelectedProductId] = useState(null); // Product ID for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  const observerRef = useRef(null); // Ref for infinite scroll trigger

  // Fetch products from the API
  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null); // Reset error before making a request
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Failed to load products (Status: ${response.status})`);
      }
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // No more products to load
      } else {
        setProducts((prev) => [...prev, ...data]); // Add new products to the list
      }
    } catch (error) {
      setError("Unable to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  const applyFiltersAndSort = () => {
    let updatedProducts = [...products]; // Work on the entire product list

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

    setFilteredProducts(updatedProducts); // Update the displayed product list
  };

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // Load the next page
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

  // Reapply filters and sorting whenever products, filters, or sort change
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
      {/* Filter and Sort Bar */}
      <FilterSortBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Error Message */}
      {error && <div className="product-list__error">{error}</div>}

      {/* Product Grid */}
      <div className="product-list__grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${page}-${index}`} // Ensure unique keys for stable rendering
            product={product}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="product-list__loading">Loading...</div>}

      {/* Load More Trigger */}
      <div ref={observerRef} className="product-list__observer"></div>

      {/* Product Modal */}
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
