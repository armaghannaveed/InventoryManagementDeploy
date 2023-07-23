import React from 'react';
import './InventoryCount.css'

const InventoryCount = ({ count }) => {
  return (
    <div className="inventory-count">
      <span className="count">{count}</span>
    </div>
  );
};

export default InventoryCount;
