import type { InventoryState } from "../types/inventory";

import { useState, useEffect, useCallback } from "react";

import { fetchInventoryData } from "../services/inventoryService";

export const useInventory = () => {
  const [state, setState] = useState<InventoryState>({
    items: [],
    filteredItems: [],
    isLoading: true, // Iniciar con isLoading en true
    error: null,
    searchQuery: "",
    sortBy: "quantity",
    sortDirection: "desc",
  });

  // Fetch inventory data
  const fetchInventory = useCallback(async () => {
    // Establecer estado de carga
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

    try {
      // Añadir un retraso mínimo para asegurar que se muestre el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Obtener datos - ahora siempre devuelve datos (o datos de respaldo)
      const data = await fetchInventoryData();

      // Actualizar estado con los datos obtenidos
      setState((prevState) => ({
        ...prevState,
        items: data,
        filteredItems: data,
        isLoading: false,
        error: null,
      }));
    } catch (error: unknown) {
      // Este bloque no debería ejecutarse normalmente ya que fetchInventoryData
      // ahora maneja los errores internamente y devuelve datos de respaldo
      console.error("Error inesperado en useInventory:", error);

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Error al obtener los datos",
      }));
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Extraer las propiedades del estado para usarlas como dependencias individuales
  const { items, searchQuery, sortBy, sortDirection } = state;

  // Handle search and sorting
  useEffect(() => {
    // No hacer nada si no hay items
    if (items.length === 0) return;

    // First filter based on search query
    let filtered = [...items];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (item) => item.name.toLowerCase().includes(query) || item.id.toString().includes(query),
      );
    }

    // Then sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;

      // Compare based on sortBy property
      if (sortBy === "id") {
        comparison = a.id - b.id;
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "quantity") {
        comparison = a.quantity - b.quantity;
      }

      // Apply sort direction
      return sortDirection === "asc" ? comparison : -comparison;
    });

    // Usar una función de actualización para evitar dependencias circulares
    setState((prevState) => {
      // Si los items filtrados son iguales a los que ya tenemos, no actualizar
      if (JSON.stringify(prevState.filteredItems) === JSON.stringify(filtered)) {
        return prevState;
      }

      return { ...prevState, filteredItems: filtered };
    });
  }, [items, searchQuery, sortBy, sortDirection]); // Dependencias específicas en lugar de todo el estado

  // Update search query
  const setSearchQuery = (query: string) => {
    setState((prevState) => ({ ...prevState, searchQuery: query }));
  };

  // Update sort parameters
  const setSorting = (sortBy: "id" | "name" | "quantity", sortDirection: "asc" | "desc") => {
    setState((prevState) => ({ ...prevState, sortBy, sortDirection }));
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
    refreshInventory,
  };
};
