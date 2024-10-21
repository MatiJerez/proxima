import React from 'react';
import { Button, List, ListItem } from '@mui/material';

export default function ItemList({ items, handleEditItem, handleDeleteItem }) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          {item.name}: {item.description}
          <Button onClick={() => handleEditItem(item)}>Edit</Button>
          <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
        </ListItem>
      ))}
    </List>
  );
}