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

const COLOR_MAP: readonly [string, string][] = [
  ["aguamar", "#2DD4BF"],
  ["turques", "#14B8A6"],
  ["celest", "#38BDF8"],
  ["marin", "#1E3A6D"],
  ["negr", "#26292E"],
  ["blanc", "#F8FAFC"],
  ["crud", "#E8DFCA"],
  ["beig", "#D6C29F"],
  ["arena", "#D8C39E"],
  ["camel", "#C19A6B"],
  ["ocre", "#CC7722"],
  ["mostaz", "#D4A017"],
  ["dorad", "#D4AF37"],
  ["oro", "#D4AF37"],
  ["plat", "#CBD5E1"],
  ["gris", "#94A3B8"],
  ["fucsi", "#D946EF"],
  ["coral", "#FB7185"],
  ["salm", "#FDA4AF"],
  ["rosa", "#F472B6"],
  ["burde", "#7F1D1D"],
  ["granat", "#881337"],
  ["vino", "#7F1D1D"],
  ["teja", "#B45309"],
  ["terracot", "#C2410C"],
  ["naranj", "#F97316"],
  ["amarill", "#EAB308"],
  ["oliv", "#65A30D"],
  ["caqui", "#848860"],
  ["menta", "#34D399"],
  ["verd", "#22C55E"],
  ["azul", "#3B82F6"],
  ["morad", "#7C3AED"],
  ["violet", "#8B5CF6"],
  ["lila", "#C084FC"],
  ["lavand", "#A78BFA"],
  ["marr", "#78350F"],
  ["chocolat", "#5C2C16"],
  ["cafe", "#6F4E37"],
  ["roj", "#EF4444"],
];

const adjustHexBrightness = (hex: string, delta: number): string => {
  const num = Number.parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((num >> 16) + delta);
  const g = clamp(((num >> 8) & 0xff) + delta);
  const b = clamp((num & 0xff) + delta);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

export const getColorSwatch = (name: string): string => {
  const n = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  for (const [key, hex] of COLOR_MAP) {
    if (n.includes(key)) {
      if (n.includes("clar")) return adjustHexBrightness(hex, 38);
      if (n.includes("oscur")) return adjustHexBrightness(hex, -38);
      return hex;
    }
  }

  let hash = 0;
  for (let i = 0; i < n.length; i++) {
    hash = n.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 52%)`;
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
