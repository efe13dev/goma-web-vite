import type { InventoryItem } from "../types/inventory";

// URL de la API
const API_URL = "https://api-rubber-hono.onrender.com/stock";

// Fetch inventory data from API
export const fetchInventoryData = async (): Promise<InventoryItem[]> => {
	try {
		// Simular un pequeño retraso para mostrar el estado de carga
		const [response] = await Promise.all([
			fetch(API_URL),
			new Promise((resolve) => setTimeout(resolve, 800)),
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
		// Propagar el error en lugar de usar datos de respaldo
		throw new Error("No se pudieron obtener los datos");
	}
};
