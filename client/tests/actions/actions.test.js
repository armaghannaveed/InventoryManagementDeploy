import { addItem } from '../../src/actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('actions', () => {
  it('creates ADD_ITEM action when adding an item', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const store = mockStore({ itemList: [] });

    const item = { itemName: 'Test Item' };
    await store.dispatch(addItem(item));

    const actions = store.getActions();

    // Check if the action dispatched is loadItems
    expect(actions[0].type).toBe('SET_ITEMS');
  });
});
