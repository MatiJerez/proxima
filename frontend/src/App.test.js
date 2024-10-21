import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useItems } from './hooks/useItems';

jest.mock('./hooks/useItems');

describe('App Component', () => {
  const mockAddMutation = { mutate: jest.fn() };
  const mockUpdateMutation = { mutate: jest.fn() };
  const mockDeleteMutation = { mutate: jest.fn() };

  const mockItems = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ];

  beforeEach(() => {
    useItems.mockReturnValue({
      items: mockItems,
      isLoading: false,
      error: null,
      addMutation: mockAddMutation,
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
    });
  });

  it('should display loading state', () => {
    useItems.mockReturnValueOnce({
      items: [],
      isLoading: true,
      error: null,
      addMutation: mockAddMutation,
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
    });

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error state', () => {
    useItems.mockReturnValueOnce({
      items: [],
      isLoading: false,
      error: 'Error fetching items',
      addMutation: mockAddMutation,
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
    });

    render(<App />);
    expect(screen.getByText('Error fetching items')).toBeInTheDocument();
  });
});