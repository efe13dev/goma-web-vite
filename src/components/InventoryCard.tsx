import type { InventoryItem } from "../types/inventory";
import type React from "react";

import { ChevronRight } from "lucide-react";

import { getColorSwatch } from "../services/inventoryService";

interface InventoryCardProps {
  item: InventoryItem;
  onSelect: (item: InventoryItem) => void;
  style?: React.CSSProperties;
}

type QuantityLevel = "low" | "medium" | "high";

const LEVEL_CONFIG: Record<QuantityLevel, { badge: string; bar: string }> = {
  low: {
    badge: "bg-stock-low/10 text-stock-low ring-stock-low/20",
    bar: "bg-stock-low",
  },
  medium: {
    badge: "bg-stock-mid/10 text-stock-mid ring-stock-mid/20",
    bar: "bg-stock-mid",
  },
  high: {
    badge: "bg-stock-high/10 text-stock-high ring-stock-high/20",
    bar: "bg-stock-high",
  },
};

const InventoryCard: React.FC<InventoryCardProps> = ({ item, onSelect, style }) => {
  // Determine quantity level for styling
  const getQuantityLevel = (quantity: number): QuantityLevel => {
    if (quantity <= 1) return "low";
    if (quantity <= 3) return "medium";

    return "high";
  };

  const quantityLevel = getQuantityLevel(item.quantity);
  const config = LEVEL_CONFIG[quantityLevel];
  const swatchColor = getColorSwatch(item.name);

  // Calculate progress percentage for the bar
  const progressPercentage = Math.min((item.quantity / 12) * 100, 100);
  const progressPercentageVisible = Math.max(progressPercentage, item.quantity > 0 ? 4 : 0);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="md-card md-card-hover card-animate group w-full cursor-pointer p-4 text-left active:scale-[0.99] sm:p-5"
      style={style}
    >
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/15"
            style={{ backgroundColor: swatchColor }}
            aria-hidden="true"
          />
          <h3 className="min-w-0 truncate font-display text-[15px] font-semibold capitalize tracking-tight text-on-surface sm:text-base">
            {item.name}
          </h3>
          <ChevronRight
            size={15}
            className="shrink-0 text-on-surface-variant/45 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-on-surface"
          />
        </div>
        <div
          className={`inline-flex shrink-0 items-baseline gap-1 rounded-lg px-2.5 py-1 ring-1 ring-inset ${config.badge}`}
        >
          <span className="font-quantity text-lg font-semibold tabular-nums leading-none tracking-tight">
            {item.quantity}
          </span>
          <span className="text-[11px] font-medium opacity-80">uds</span>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-surface-variant">
        <div
          className={`h-1.5 rounded-full transition-[width] duration-700 ease-out ${config.bar}`}
          style={{ width: `${progressPercentageVisible}%` }}
        />
      </div>
    </button>
  );
};

export default InventoryCard;
