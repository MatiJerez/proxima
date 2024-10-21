import React from 'react';
import { Container } from '@mui/material';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { useItems } from './hooks/useItems';

function App() {
  const { items, isLoading, error, addMutation, updateMutation, deleteMutation } = useItems();

  const handleAddItem = (event) => {
    const newItem = {
      id: Date.now(),
      name: event.target.name.value,
      description: event.target.description.value,
    };
    addMutation.mutate(newItem);
    event.target.reset();
  };

  const handleEditItem = (item) => {
    const updatedItem = {
      ...item,
      name: prompt('Edit name:', item.name),
      description: prompt('Edit description:', item.description),
    };
    updateMutation.mutate(updatedItem);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching items</div>;

  return (
    <Container>
      <h1>Items</h1>
      <ItemForm handleAddItem={handleAddItem} />
      <ItemList items={items} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} />
    </Container>
  );
}

export default App;