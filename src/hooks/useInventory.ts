import { useState, useEffect, useCallback } from 'react';
import { fetchInventoryData } from '../services/inventoryService';
import type { InventoryState } from '../types/inventory';

export const useInventory = () => {
  const [state, setState] = useState<InventoryState>({
    items: [],
    filteredItems: [],
    isLoading: true,
    error: null,
    searchQuery: '',
    sortBy: 'id',
    sortDirection: 'asc'
  });

  // Fetch inventory data
  const fetchInventory = useCallback(async () => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true, error: null }));
      
      // Intentar obtener los datos
      const data = await fetchInventoryData();
      
      // Si llegamos aquí, la petición fue exitosa
      setState(prevState => ({ 
        ...prevState, 
        items: data, 
        filteredItems: data,
        isLoading: false,
        error: null
      }));
    } catch (error: unknown) {
      console.error('Error en useInventory:', error);
      
      // Si hay un error, mantener los datos anteriores si existen
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al cargar los datos'
      }));
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Handle search and sorting
  useEffect(() => {
    const { items, searchQuery, sortBy, sortDirection } = state;
    
    // First filter based on search query
    let filtered = [...items];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.id.toString().includes(query)
      );
    }
    
    // Then sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      // Compare based on sortBy property
      if (sortBy === 'id') {
        comparison = a.id - b.id;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'quantity') {
        comparison = a.quantity - b.quantity;
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setState(prevState => ({ ...prevState, filteredItems: filtered }));
  }, [state]);

  // Update search query
  const setSearchQuery = (query: string) => {
    setState(prevState => ({ ...prevState, searchQuery: query }));
  };

  // Update sort parameters
  const setSorting = (sortBy: 'id' | 'name' | 'quantity', sortDirection: 'asc' | 'desc') => {
    setState(prevState => ({ ...prevState, sortBy, sortDirection }));
  };

  // Refresh inventory data
  const refreshInventory = () => {
    fetchInventory();
  };

  return {
    items: state.filteredItems,
    isLoading: state.isLoading,
    error: state.error,
    searchQuery: state.searchQuery,
    sortBy: state.sortBy,
    sortDirection: state.sortDirection,
    setSearchQuery,
    setSorting,
    refreshInventory
  };
};