import React from 'react';
import { Button, TextField } from '@mui/material';

export default function ItemForm({ handleAddItem }) {
  return (
    <form onSubmit={handleAddItem}>
      <TextField name="name" label="Name" required />
      <TextField name="description" label="Description" required />
      <Button type="submit">Add Item</Button>
    </form>
  );
}