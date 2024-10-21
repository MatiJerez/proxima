import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemList from './ItemList';

describe('ItemList Component', () => {
  const mockHandleEditItem = jest.fn();
  const mockHandleDeleteItem = jest.fn();
  const mockItems = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ];

  beforeEach(() => {
    render(
      <ItemList
        items={mockItems}
        handleEditItem={mockHandleEditItem}
        handleDeleteItem={mockHandleDeleteItem}
      />
    );
  });

  it('renders a list of items with name and description', () => {
    expect(screen.getByText('Item 1: Description 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2: Description 2')).toBeInTheDocument();
  });

  it('calls handleEditItem when the edit button is clicked', () => {
    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    expect(mockHandleEditItem).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls handleDeleteItem when the delete button is clicked', () => {
    const deleteButton = screen.getAllByText('Delete')[1];
    fireEvent.click(deleteButton);

    expect(mockHandleDeleteItem).toHaveBeenCalledWith(2);
  });

  it('renders the correct number of items', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockItems.length);
  });
});