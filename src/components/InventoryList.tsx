import type React from "react";
import type { InventoryItem } from "../types/inventory";

import { PackageSearch } from "lucide-react";

import InventoryCard from "./InventoryCard";

interface InventoryListProps {
  items: InventoryItem[];
  isLoading: boolean;
  hasError?: boolean;
  skeletonCount?: number;
}

const InventoryList: React.FC<InventoryListProps> = ({
  items,
  isLoading,
  hasError = false,
  skeletonCount = 5,
}) => {
  if (isLoading) {
    return (
      <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div key={`skeleton-${index}`} className="md-card p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="h-5 w-28 rounded bg-surface-variant" />
              <div className="h-8 w-12 rounded bg-surface-variant" />
            </div>
            <div className="h-2.5 rounded-full bg-surface-variant" />
          </div>
        ))}
      </div>
    );
  }

  // Don't show "No items found" if there's an error
  if (items.length === 0 && !hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">
          <PackageSearch size={28} />
        </div>
        <p className="text-lg font-medium text-on-surface">No se encontraron items</p>
        <p className="mt-1 text-sm text-on-surface-variant">
          No hay productos en el inventario por el momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <InventoryCard key={item.id} item={item} style={{ animationDelay: `${index * 100}ms` }} />
      ))}
    </div>
  );
};

export default InventoryList;
