import type { InventoryItem } from "../types/inventory";

// API URL a través del proxy de Vite
const API_URL = "/api/stock";

// Datos de respaldo en caso de error (solo se usarán si falla la API)
const FALLBACK_DATA: InventoryItem[] = [
  { id: 3, name: "negro", quantity: 11 },
  { id: 4, name: "marino", quantity: 3 },
  { id: 33, name: "blanco", quantity: 11 },
  { id: 34, name: "negro pega", quantity: 4 },
  { id: 44, name: "crudo", quantity: 4 }
];

// Fetch inventory data from API
export const fetchInventoryData = async (): Promise<InventoryItem[]> => {
  try {
    // Simular un pequeño retraso para mostrar el estado de carga
    const [response] = await Promise.all([
      fetch(API_URL),
      new Promise(resolve => setTimeout(resolve, 800))
    ]);

    if (!response.ok) {
      console.error(`Error en la respuesta de la API: ${response.status}`);
      throw new Error("Error al obtener los datos");
    }
    
    // Obtener el texto de la respuesta primero
    const responseText = await response.text();
    
    // Intentar parsear el texto como JSON
    try {
      // Limpiar posibles caracteres no deseados al inicio o final
      const cleanedText = responseText.trim();
      const data = JSON.parse(cleanedText);
      
      if (!Array.isArray(data)) {
        console.error("La respuesta no es un array");
        throw new Error("Error al obtener los datos");
      }
      
      return data;
    } catch (parseError) {
      console.error("Error al parsear la respuesta JSON:", parseError);
      throw new Error("Error al obtener los datos");
    }
  } catch (error: unknown) {
    console.error("Error al obtener datos del inventario:", error);
    // Solo en caso de error, usar datos de respaldo
    return FALLBACK_DATA;
  }
};
