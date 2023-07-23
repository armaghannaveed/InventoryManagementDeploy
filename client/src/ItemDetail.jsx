import React, { useState } from 'react';
import './ItemDetail.css';
import ItemEditForm from './ItemEditForm';

const ItemDetail = ({ item, onSave, onClose }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = (updatedItem) => {
    onSave(updatedItem);
    setEditMode(false);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <h3 className="item-detail-title">{item.itemName}</h3>
          <p className="item-detail-text">Description: {item.description}</p>
          <p className="item-detail-text">Price: ${item.price}</p>
          <p className="item-detail-text">Manufacturer: {item.manufacturer}</p>
          <img className="item-detail-image" src={item.imageUrl} alt="Item" />
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <ItemEditForm item={item} onCancel={handleCancelEdit} onSave={handleSaveEdit} onClose={onClose} />
      )}
    </div>
  );
};

export default ItemDetail;
