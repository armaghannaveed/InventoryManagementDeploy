import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../src/reducers/inventoryReducer'; // Update with your path
import InventoryForm from '../../src/form';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';


const mockItem = {
  _id: '123',
  itemName: 'Test Item',
  description: 'Test Description',
  manufacturer: 'Test Manufacturer',
  price: 100,
  imageUrl: 'test-image-url'
};

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState, applyMiddleware(thunk)) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    ),
    store,
  };
};

describe('InventoryForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify([mockItem]));
  });

  test('renders InventoryForm component', () => {
    renderWithRedux(<InventoryForm />);
    expect(screen.getByText(/Enter Inventory Information/i)).toBeInTheDocument();
  });

  test('Checks Price input value', () => {
    renderWithRedux(<InventoryForm />);
    const input = screen.getByPlaceholderText('Enter Number');
    fireEvent.change(input, { target: { value: "100" } });
    expect(input.value).toBe("100");
  });

  test('opens and closes modal', () => {
    renderWithRedux(<InventoryForm />, {
      initialState: {
        itemList: [mockItem]
      }
    });

    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);

    expect(screen.getByText('Description: Test Description')).toBeInTheDocument();
    expect(screen.getByText('Manufacturer: Test Manufacturer')).toBeInTheDocument();

  });

});
