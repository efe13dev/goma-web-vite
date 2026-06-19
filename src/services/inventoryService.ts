import type { InventoryItem } from "../types/inventory";

const API_URL = import.meta.env.VITE_API_URL || "/api/stock";

export const fetchInventoryData = async (): Promise<InventoryItem[]> => {
  const [response] = await Promise.all([
    fetch(API_URL),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]);

  if (!response.ok) throw new Error(`API ${response.status}`);

  const data = JSON.parse((await response.text()).trim());

  if (!Array.isArray(data)) throw new Error("La respuesta no es un array");

  return data;
};
