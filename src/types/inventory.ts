export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

export interface InventoryState {
  items: InventoryItem[];
  filteredItems: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: "id" | "name" | "quantity";
  sortDirection: "asc" | "desc";
}
