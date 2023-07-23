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
    fetch('http://localhost:8000/items', {
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
    fetch(`http://localhost:8000/items/${id}`, {
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
    fetch('http://localhost:8000/items')
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
    fetch(`http://localhost:8000/drop`, {
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
    fetch(`http://localhost:8000/items/sort/${key}`)
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
    fetch(`http://localhost:8000/items/${id}`, {
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
