import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItem, deleteItem, deleteAllItems, loadItems, updateItem, loadSortedItems } from './actions';
import ItemDetail from './ItemDetail';
import InventoryCount from './ExtraFeatures/InventoryCount';
import './form.css';
import SortBy from './ExtraFeatures/SortBy';
import AveragePrice from './ExtraFeatures/AveragePrice';

const InventoryForm = ({ itemList, addItem, deleteItem, deleteAllItems, loadItems, loadSortedItems }) => {
  const [formValues, setFormValues] = useState({
    itemName: '',
    description: '',
    price: '',
    manufacturer: '',
    imageUrl: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortKey, setSortKey] = useState(null);

  //Help from StackOverflow
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSort = (key) => {
    setSortKey(key);
    loadSortedItems(key);
  };

  
  //Image Change Help ChatGPT
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const imageUrl = image ? URL.createObjectURL(image) : '';
    setFormValues((prevValues) => ({
      ...prevValues,
      imageUrl: imageUrl,
    }));
    console.log(imageUrl); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(formValues);
    setFormValues({ itemName: '', description: '', manufacturer: '', price: '', imageUrl: ''});
  };

  const deleteRow = (id) => {
    deleteItem(id);
  };
  
  const deleteAllRows = () => {
    deleteAllItems();
  };

  const closeModal = (e) => {
    if (e && (e.target.className === 'modal' || e.target.className === 'close')) {
      setShowModal(false);
      setSelectedItem(null);
    }
  };
  

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  
  useEffect(() => {
    loadItems();
}, []);


  useEffect(() => {
    document.body.classList.add('form-body');

    return () => {
      document.body.classList.remove('form-body');
    };
  }, []);
  
  const handleItemUpdate = (_id, updatedItem) => {
    console.log('In handleItemUpdate, _id:', _id);  // Add this line
    updateItem(_id, updatedItem);
    setShowModal(false); 
    loadItems(); 
  };  

  
  return (
    <div className="content">
      <InventoryCount count={itemList.length} />
<AveragePrice itemList={itemList} />
      <Link to="/">
        <img className='homeicon' src='images/home.png' alt='home' />
      </Link>
      <h2>Enter Inventory Information</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Item Name:</td>
              <td>
                <input
                  type="text"
                  size="25"
                  name="itemName"
                  value={formValues.itemName}
                  onChange={handleChange}
                  placeholder="Enter Text"
                />
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>
                <input
                  type="text"
                  size="25"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Enter Text"
                />
              </td>
            </tr>
            <tr>
              <td>Manufacturer:</td>
              <td>
                <input
                  type="text"
                  size="25"
                  name="manufacturer"
                  value={formValues.manufacturer}
                  onChange={handleChange}
                  placeholder="Enter Text"
                />
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <input
                  type="number"
                  size="25"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  placeholder="Enter Number"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Choose Image:</td>
              <td>
                <input
                  type="file"
                  name="imageUrl"
                  onChange={handleImageChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
      <SortBy handleSort={handleSort} />

      <button onClick={deleteAllRows}>Delete All Rows</button>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th className="image">Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {itemList
  .sort((a, b) => {
    if (sortKey === 'itemName') {
      return a.itemName.localeCompare(b.itemName);
    } else if (sortKey === 'price') {
      return a.price - b.price;
    } else {
      return 0; // No sorting
    }
  }).map((data, index) => (
    <tr key={data._id}>
              <td>{data.itemName}</td>
              <td>{data.description}</td>
              <td>{data.manufacturer}</td>
              <td>${data.price}</td>
              <td>
                {data.imageUrl ? (
                  <img className='inventoryIcons'
                    src={data.imageUrl}
                    alt="Image"
                  />
                ) : (
                  ''
                )}
              </td>
              <td> <button onClick={() => handleItemClick(data)}>View</button></td>
              <td>
              <button onClick={() => deleteRow(data._id)}>Delete</button>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
      {selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ItemDetail item={selectedItem} handleUpdate={handleItemUpdate} onClose={closeModal}  />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemList: state.itemList,
});

export default connect(mapStateToProps, { addItem, deleteItem, deleteAllItems, loadItems, updateItem, loadSortedItems })(InventoryForm);

