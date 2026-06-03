import type { InventoryItem } from "../types/inventory";

// API URL - uses environment variable (Vite proxy in dev, full URL in production)
const API_URL = import.meta.env.VITE_API_URL || "/api/stock";

// Fetch inventory data from API
export const fetchInventoryData = async (): Promise<InventoryItem[]> => {
  try {
    // Simulate a small delay to show loading state
    const [response] = await Promise.all([
      fetch(API_URL),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]);

    if (!response.ok) {
      console.error(`API response error: ${response.status}`);
      throw new Error("Error al obtener los datos");
    }

    // Get response text first
    const responseText = await response.text();

    // Try to parse text as JSON
    try {
      // Clean possible unwanted characters at start or end
      const cleanedText = responseText.trim();
      const data = JSON.parse(cleanedText);

      if (!Array.isArray(data)) {
        console.error("Response is not an array");
        throw new Error("Error al obtener los datos");
      }

      return data;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Error al obtener los datos");
    }
  } catch (error: unknown) {
    console.error("Error fetching inventory data:", error);
    // Propagate error instead of using fallback data
    throw new Error("No se pudieron obtener los datos");
  }
};
