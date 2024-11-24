// import FilterSortBar from "../components/FilterSortBar";
import ProductList from "../components/ProductList";
import React from "react";

const Dashboard = () => {
  // const [filters, setFilters] = useState({});
  // const [sort, setSort] = useState("");

  // const handleFilterChange = (key, value) => {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  // };

  // const handleSortChange = (value) => setSort(value);

  return (
    <div>
      {/* <FilterSortBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      /> */}
      <ProductList />
    </div>
  );
};

export default Dashboard;
