export interface FormulaIngredient {
  id: number;
  name: string;
  quantity: number;
}

export interface Formula {
  id: number;
  name: string;
  ingredients: FormulaIngredient[];
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}
