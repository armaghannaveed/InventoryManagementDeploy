import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateItem } from './actions';

const ItemEditForm = ({ item, updateItem, onClose }) => {
  
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem(item._id, editedItem);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          name="itemName"
          value={editedItem.itemName}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={editedItem.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={editedItem.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Manufacturer:
        <input
          type="text"
          name="manufacturer"
          value={editedItem.manufacturer}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={editedItem.imageUrl}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default connect(null, { updateItem })(ItemEditForm);
