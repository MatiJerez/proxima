import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemForm from './ItemForm';

describe('ItemForm Component', () => {
  const mockHandleAddItem = jest.fn();

  beforeEach(() => {
    render(<ItemForm handleAddItem={mockHandleAddItem} />);
  });

  it('renders name and description input fields', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('renders the add item button', () => {
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
  });

  it('calls handleAddItem when form is submitted', () => {

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.submit(screen.getByRole('button', { name: /add item/i }));
    expect(mockHandleAddItem).toHaveBeenCalled();
    expect(mockHandleAddItem).toHaveBeenCalledTimes(1);
  });
});