import axios from 'axios';

const API_URL = 'http://localhost:8000/items';

export const fetchItems = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const addItem = async (newItem) => {
  try {
    const { data } = await axios.post(API_URL, newItem);
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateItem = async (updatedItem) => {
  try {
    const { data } = await axios.put(`${API_URL}/${updatedItem.id}`, updatedItem);
    return data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};