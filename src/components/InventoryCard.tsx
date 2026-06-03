import type React from "react";
import type { InventoryItem } from "../types/inventory";

interface InventoryCardProps {
  item: InventoryItem;
  style?: React.CSSProperties;
}

type QuantityLevel = "low" | "medium" | "high";

const LEVEL_CONFIG: Record<QuantityLevel, { text: string; bar: string }> = {
  low: {
    text: "text-stock-low",
    bar: "bg-stock-low",
  },
  medium: {
    text: "text-stock-mid",
    bar: "bg-stock-mid",
  },
  high: {
    text: "text-stock-high",
    bar: "bg-stock-high",
  },
};

const InventoryCard: React.FC<InventoryCardProps> = ({ item, style }) => {
  // Determine quantity level for styling
  const getQuantityLevel = (quantity: number): QuantityLevel => {
    if (quantity <= 1) return "low";
    if (quantity <= 3) return "medium";

    return "high";
  };

  const quantityLevel = getQuantityLevel(item.quantity);
  const config = LEVEL_CONFIG[quantityLevel];

  // Calculate progress percentage for the bar
  const progressPercentage = Math.min((item.quantity / 12) * 100, 100);
  const progressPercentageVisible = Math.max(progressPercentage, item.quantity > 0 ? 4 : 0);

  return (
    <div className="md-card md-card-hover card-animate p-4" style={style}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="min-w-0 truncate font-display text-base font-semibold capitalize tracking-tight text-on-surface">
          {item.name}
        </h3>
        <div className="flex shrink-0 items-baseline gap-1">
          <span
            className={`font-quantity text-[32px] font-bold tabular-nums leading-none tracking-tight ${config.text}`}
          >
            {item.quantity}
          </span>
          <span className="text-xs font-medium text-on-surface-variant">uds</span>
        </div>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-surface-variant">
        <div
          className={`h-2.5 rounded-full transition-[width] duration-700 ease-out ${config.bar}`}
          style={{ width: `${progressPercentageVisible}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryCard;
