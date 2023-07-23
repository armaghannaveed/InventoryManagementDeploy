import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import inventoryReducer from './reducers/inventoryReducer';

const store = createStore(inventoryReducer, applyMiddleware(thunk));

export default store;
