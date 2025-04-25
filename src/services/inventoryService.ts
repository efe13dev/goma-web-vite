import type { InventoryItem } from "../types/inventory";

// API URL
const API_URL = "https://api-rubber-hono.onrender.com/stock";

// Fetch inventory data from API
export const fetchInventoryData = async (): Promise<InventoryItem[]> => {
	try {
		// Crear un controlador de aborto con un timeout de 10 segundos
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);
		
		const response = await fetch(API_URL, {
			signal: controller.signal,
			headers: {
				'Accept': 'application/json',
				'Cache-Control': 'no-cache'
			}
		});
		
		// Limpiar el timeout
		clearTimeout(timeoutId);

		if (!response.ok) {
			console.warn(`Error en la respuesta de la API: ${response.status}`);
			throw new Error("Error al obtener los datos");
		}
		
		// Intentar parsear la respuesta como JSON
		try {
			const data = await response.json();
			
			// Verificar que los datos son un array
			if (!Array.isArray(data)) {
				console.warn("La respuesta no es un array");
				throw new Error("Error al obtener los datos");
			}
			
			return data;
		} catch (parseError) {
			console.error("Error al parsear la respuesta JSON:", parseError);
			throw new Error("Error al obtener los datos");
		}
	} catch (error: unknown) {
		// Manejar error de timeout
		if (error instanceof Error && error.name === 'AbortError') {
			console.error("La solicitud ha excedido el tiempo de espera");
			throw new Error("Error al obtener los datos");
		}
		
		console.error("Error al obtener datos del inventario:", error);
		
		// Si ya es un Error con el mensaje que queremos, lo lanzamos tal cual
		if (error instanceof Error && error.message === "Error al obtener los datos") {
			throw error;
		}
		
		// De lo contrario, lanzamos un nuevo error con el mensaje que queremos
		throw new Error("Error al obtener los datos");
	}
};
