import type { InventoryItem } from "../types/inventory";

import { useCallback, useEffect, useState } from "react";

import { fetchInventoryData } from "../services/inventoryService";

const LAST_COUNT_KEY = "goma-last-item-count";
const DEFAULT_SKELETON_COUNT = 5;

const readLastCount = (): number => {
  if (typeof window === "undefined") return DEFAULT_SKELETON_COUNT;

  const stored = Number(window.localStorage.getItem(LAST_COUNT_KEY));

  return Number.isFinite(stored) && stored > 0 ? stored : DEFAULT_SKELETON_COUNT;
};

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skeletonCount, setSkeletonCount] = useState<number>(readLastCount);

  // Fetch inventory data
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Añadir un retraso mínimo para asegurar que se muestre el estado de carga
      /*  await new Promise((resolve) => setTimeout(resolve, 200)); */

      // Simular un error para probar el botón de reintentar
      /* throw new Error("Error simulado para probar"); */

      // Obtener datos
      const data = await fetchInventoryData();

      // Actualizar estado con los datos obtenidos
      setItems(data);

      // Recordar el conteo para mostrar el número correcto de skeletons la próxima vez
      if (data.length > 0) {
        setSkeletonCount(data.length);
        window.localStorage.setItem(LAST_COUNT_KEY, String(data.length));
      }

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
    skeletonCount,
    refreshInventory,
  };
};
