import React from "react";

const FilterSortBar = ({ filters, onFilterChange, onSortChange }) => {
  return (
    <div className="filter-sort-bar">
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={filters.category || ""}
        onChange={(e) => onFilterChange("category", e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice || ""}
        onChange={(e) => onFilterChange("minPrice", e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice || ""}
        onChange={(e) => onFilterChange("maxPrice", e.target.value)}
      />
    </div>
  );
};

export default FilterSortBar;
