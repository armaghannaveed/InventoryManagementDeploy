const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';
const SET_ITEMS = 'SET_ITEMS';

const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

const addItem = (item) => {
  return (dispatch) => {
    console.log(item);
    fetch('https://inventorymanagementdeploy.onrender.com/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(() => {
        dispatch(loadItems());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};

const deleteItem = (id) => {
  return (dispatch) => {
    fetch(`https://inventorymanagementdeploy.onrender.com/items/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        dispatch(loadItems());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};

const loadItems = () => {
  return (dispatch) => {
    fetch('https://inventorymanagementdeploy.onrender.com/items')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setItems(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};

const deleteAllItems = () => {
  return (dispatch) => {
    fetch(`https://inventorymanagementdeploy.onrender.com/drop`, {
      method: 'DELETE'
    })
      .then(() => {
        dispatch(loadItems());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};


const loadSortedItems = (key) => {
  return (dispatch) => {
    fetch(`https://inventorymanagementdeploy.onrender.com/items/sort/${key}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setItems(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};


const updateItem = (id, updatedItem) => {
  console.log(id);
  return (dispatch) => {
    fetch(`https://inventorymanagementdeploy.onrender.com/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then(() => {
        dispatch(loadItems());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};



module.exports = {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  SET_ITEMS,
  addItem,
  deleteItem,
  loadItems,
  deleteAllItems,
  updateItem,
  loadSortedItems
};
