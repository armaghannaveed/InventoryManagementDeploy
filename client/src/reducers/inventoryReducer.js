// Initial state declaration removed here

// Initialize state to an empty object
const inventoryReducer = (state = { itemList: [] }, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        itemList: [...state.itemList, action.payload],
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        itemList: state.itemList.filter((_, index) => index !== action.payload),
      };
    case 'DELETE_ALL_ITEMS':
      return {
        ...state,
        itemList: [],
      };
    case 'SET_ITEMS':
      return {
        ...state,
        itemList: action.payload,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
