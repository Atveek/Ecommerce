// Example SidePanel.js component

import React from "react";

const SidePanel = () => {
  return (
    <div className="w-32 sticky top-8">
      <h2>Filter Products</h2>
      <label>Categories:</label>
      {/* Category checkboxes */}
      <label>Price Range:</label>
      {/* Price range slider */}
      <label>Brand:</label>
      {/* Brand checkboxes */}
      {/* Add more filter options based on your product attributes */}
    </div>
  );
};

export default SidePanel;
