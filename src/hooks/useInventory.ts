import type { Formula, InventoryItem } from "../types/inventory";

import { useCallback, useEffect, useState } from "react";

import { fetchFormulasData, fetchInventoryData } from "../services/inventoryService";

const SKELETON_COUNT_KEY = "goma-skeleton-count";
const DEFAULT_SKELETON_COUNT = 5;

const readSkeletonCount = (): number => {
  const stored = Number(localStorage.getItem(SKELETON_COUNT_KEY));

  return Number.isFinite(stored) && stored > 0 ? stored : DEFAULT_SKELETON_COUNT;
};

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skeletonCount, setSkeletonCount] = useState<number>(readSkeletonCount);

  const refreshInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [data, formulasResult] = await Promise.all([
        fetchInventoryData(),
        fetchFormulasData().catch((formulasError: unknown) => {
          console.error("Error fetching formulas:", formulasError);

          return null;
        }),
      ]);

      setItems(data);

      if (formulasResult) {
        setFormulas(formulasResult);
      }

      if (data.length > 0) {
        setSkeletonCount(data.length);
        localStorage.setItem(SKELETON_COUNT_KEY, String(data.length));
      }

      setIsLoading(false);
    } catch (error: unknown) {
      console.error("Unexpected error in useInventory:", error);
      setIsLoading(false);
      setError("Error al obtener los datos");
    }
  }, []);

  useEffect(() => {
    void refreshInventory();
  }, [refreshInventory]);

  return {
    items,
    formulas,
    isLoading,
    error,
    skeletonCount,
    refreshInventory,
  };
};
