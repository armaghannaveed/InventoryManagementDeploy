import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers/inventoryReducer';  // Adjust path to your reducer
import InventoryForm from '../../src/form';

test('renders InventoryForm without crashing', () => {
  render(<Provider store={createStore(rootReducer)}><InventoryForm /></Provider>);
  const linkElement = screen.getByText(/Enter Inventory Information/i);
  expect(linkElement).toBeInTheDocument();
});

test('simulates adding an item', () => {
  render(<Provider store={createStore(rootReducer)}><InventoryForm /></Provider>);
  
  fireEvent.change(screen.getByPlaceholderText('Enter Text'), { target: { value: 'Test Item' } });
  fireEvent.click(screen.getByText('Submit'));
  
  // Here, you would typically check if the action has been dispatched or if some UI change reflects the addition.
  // For now, I'll just illustrate the input change and button click.
});
