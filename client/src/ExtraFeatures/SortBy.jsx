import React from 'react';

const SortBy = ({ handleSort }) => {
  return (
    <div className="sort-by">
      <button onClick={() => handleSort('itemName')}>Sort by Name</button>
      <button onClick={() => handleSort('price')}>Sort by Price</button>
    </div>
  );
};

export default SortBy;
