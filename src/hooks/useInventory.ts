import type { InventoryItem } from "../types/inventory";

import { useState, useEffect, useCallback } from "react";

import { fetchInventoryData } from "../services/inventoryService";

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inventory data
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Añadir un retraso mínimo para asegurar que se muestre el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Obtener datos
      const data = await fetchInventoryData();

      // Actualizar estado con los datos obtenidos
      setItems(data);
      setIsLoading(false);
    } catch (error: unknown) {
      console.error("Error inesperado en useInventory:", error);
      setIsLoading(false);
      setError("Error al obtener los datos");
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Refresh inventory data
  const refreshInventory = () => {
    fetchInventory();
  };

  return {
    items,
    isLoading,
    error,
    refreshInventory,
  };
};
