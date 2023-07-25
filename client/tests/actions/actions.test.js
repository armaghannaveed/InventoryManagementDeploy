// actions.test.js
const {
  addItem,
  deleteItem,
  loadItems,
  deleteAllItems,
  updateItem,
  loadSortedItems
} = require('../../src/actions');

// Mock the fetch function globally for all tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('actions', () => {

  // Clear all mocks after each test to ensure no overlap
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch addItem action', () => {
    const dispatch = jest.fn();
    const item = { name: 'Test Item', price: 10 };

    // Dispatch the addItem action with the mocked dispatch function
    return addItem(item)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should dispatch deleteItem action', () => {
    const dispatch = jest.fn();
    const itemId = 123;

    // Dispatch the deleteItem action with the mocked dispatch function
    return deleteItem(itemId)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should dispatch loadItems action', () => {
    const dispatch = jest.fn();

    // Dispatch the loadItems action with the mocked dispatch function
    return loadItems()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: "SET_ITEMS", payload: {} });
    });
});



  it('should dispatch deleteAllItems action', () => {
    const dispatch = jest.fn();

    // Dispatch the deleteAllItems action with the mocked dispatch function
    return deleteAllItems()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should dispatch updateItem action', () => {
    const dispatch = jest.fn();
    const itemId = 123;
    const updatedItem = { name: 'Updated Item', quantity: 20 };

    // Dispatch the updateItem action with the mocked dispatch function
    return updateItem(itemId, updatedItem)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should dispatch loadSortedItems action', () => {
    const dispatch = jest.fn();
    const key = 'name';  // Defining the key for the sorting operation

    // Dispatch the loadSortedItems action with the mocked dispatch function
    return loadSortedItems(key)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: "SET_ITEMS", payload: {} });
    });
});
});
