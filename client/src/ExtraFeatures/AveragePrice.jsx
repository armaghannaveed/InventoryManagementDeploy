import React from 'react';
import './AveragePrice.css';

const AveragePrice = ({ itemList }) => {
  const calculateAverage = () => {
    if (itemList.length === 0) {
      return 0;
    }

    const total = itemList.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const average = total / itemList.length;
    return average.toFixed(3);
  };

  return (
    <div className="average-price-container">
      <h2 className="average-price-label">Average Price:</h2>
      <span className="average-price">${calculateAverage()}</span>
    </div>
  );
};

export default AveragePrice;
