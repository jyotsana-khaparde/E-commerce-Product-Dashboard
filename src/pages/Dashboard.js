import React, { useState } from "react";

import FilterSortBar from "../components/FilterSortBar";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (value) => setSort(value);

  return (
    <div>
      <FilterSortBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <ProductList filters={filters} sort={sort} />
    </div>
  );
};

export default Dashboard;
