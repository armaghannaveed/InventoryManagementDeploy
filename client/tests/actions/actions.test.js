const { ADD_ITEM, DELETE_ITEM, SET_ITEMS } = require('../../src/actions');

describe('Actions', () => {
  it('should have the correct constants', () => {
    expect(ADD_ITEM).toBe('ADD_ITEM');
    expect(DELETE_ITEM).toBe('DELETE_ITEM');
    expect(SET_ITEMS).toBe('SET_ITEMS');
  });
  // You can also test action creators and other logic here...
});
