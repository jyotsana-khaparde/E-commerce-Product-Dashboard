import React, { useEffect, useRef, useState } from "react";

import FilterSortBar from "./FilterSortBar";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]); // All loaded products
  const [filteredProducts, setFilteredProducts] = useState([]); // Displayed products after filtering/sorting
  const [page, setPage] = useState(1); // Current page for infinite scroll
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Flag for more products

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  }); // Filter state
  const [sort, setSort] = useState("price-asc"); // Sorting state

  const observerRef = useRef(null); // Ref for infinite scroll trigger

  // Fetch products from the API
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10&page=${page}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // No more products to load
      } else {
        setProducts((prev) => [...prev, ...data]); // Add new products to the list
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
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

  // Observe the "load more" trigger for infinite scrolling
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

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSort(value);
  };

  return (
    <div className="product-list">
      {/* Filter and Sort Bar */}
      <FilterSortBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Product Grid */}
      <div className="product-list__grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${page}-${index}`} // Ensure unique keys for stable rendering
            product={product}
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
