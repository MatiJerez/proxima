import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchItems, addItem, updateItem, deleteItem } from '../api/itemApi';

export const useItems = () => {
  const queryClient = useQueryClient();

  const { data: items, isLoading, error } = useQuery('items', fetchItems);

  const addMutation = useMutation(addItem, {
    onSuccess: () => queryClient.invalidateQueries('items'),
  });

  const updateMutation = useMutation(updateItem, {
    onSuccess: () => queryClient.invalidateQueries('items'),
  });

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: () => queryClient.invalidateQueries('items'),
  });

  return { items, isLoading, error, addMutation, updateMutation, deleteMutation };
};