import type { InventoryItem } from "../types/inventory";

// API URL
const API_URL = "https://api-rubber-hono.onrender.com/stock";

// Datos de respaldo en caso de error
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
		// Asegurar que la petición tome al menos 1 segundo para mostrar el estado de carga
		const [response] = await Promise.all([
			fetch(API_URL),
			new Promise(resolve => setTimeout(resolve, 1000))
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
				return FALLBACK_DATA;
			}
			
			return data;
		} catch (parseError) {
			console.error("Error al parsear la respuesta JSON:", parseError);
			// Usar datos de respaldo en caso de error de parseo
			return FALLBACK_DATA;
		}
	} catch (error: unknown) {
		console.error("Error al obtener datos del inventario:", error);
		// Usar datos de respaldo en caso de error de red
		return FALLBACK_DATA;
	}
};
