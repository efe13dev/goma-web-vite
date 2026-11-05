import type { Formula, InventoryItem } from "../types/inventory";

const API_URL = import.meta.env.VITE_API_URL || "/api/stock";
const FORMULAS_URL = API_URL.replace(/\/stock\/?$/, "/formulas");

// shortcut: normaliza femenino/masculino y paréntesis porque /stock usa ej. "negra"/"gris" y /formulas usa "negro"/"gris (clara)", migrar a formulaId en DB cuando el backend vincule ambas tablas
const normalizeColorName = (name: string): string =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s*\(.*?\)\s*/g, "")
    .split(/\s+/)
    .map((word) =>
      word.endsWith("a") && word !== "pega" && word !== "rosa" ? `${word.slice(0, -1)}o` : word,
    )
    .join(" ");

export const getColorSwatch = (name: string): string => {
  const lower = name.toLowerCase();

  if (lower.includes("negr")) return "#18181b";
  if (lower.includes("marino")) return "#1e3a8a";
  if (lower.includes("blanc")) return "#ffffff";
  if (lower.includes("gris")) return "#94a3b8";
  if (lower.includes("crud")) return "#ebe0cc";
  if (lower.includes("beig")) return "#d6bc94";
  if (lower.includes("rosa")) return "#f472b6";
  if (lower.includes("agua")) return "#2dd4bf";

  return "#cbd5e1";
};

export const findFormulaForItem = (formulas: Formula[], itemName: string): Formula | undefined => {
  const exact = itemName.toLowerCase().trim();
  const normalized = normalizeColorName(itemName);

  return (
    formulas.find((formula) => formula.name.toLowerCase().trim() === exact) ??
    formulas.find((formula) => normalizeColorName(formula.name) === normalized)
  );
};

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

export const fetchFormulasData = async (): Promise<Formula[]> => {
  const response = await fetch(FORMULAS_URL);

  if (!response.ok) throw new Error(`API ${response.status}`);

  const data = JSON.parse((await response.text()).trim());

  if (!Array.isArray(data)) throw new Error("La respuesta de fórmulas no es un array");

  return data;
};
