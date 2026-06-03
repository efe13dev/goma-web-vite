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
      // Add a minimum delay to ensure loading state is shown
      /*  await new Promise((resolve) => setTimeout(resolve, 200)); */

      // Simulate error to test retry button
      /* throw new Error("Simulated error for testing"); */

      // Fetch data
      const data = await fetchInventoryData();

      // Update state with fetched data
      setItems(data);

      // Remember the count to show the correct number of skeletons next time
      if (data.length > 0) {
        setSkeletonCount(data.length);
        window.localStorage.setItem(LAST_COUNT_KEY, String(data.length));
      }

      setIsLoading(false);
    } catch (error: unknown) {
      console.error("Unexpected error in useInventory:", error);
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
