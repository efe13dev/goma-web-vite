import type React from "react";
import type { InventoryItem } from "../types/inventory";

import { Layers } from "lucide-react";

interface InventoryCardProps {
  item: InventoryItem;
  style?: React.CSSProperties;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item, style }) => {
  // Determine quantity level for styling
  const getQuantityLevel = (quantity: number): string => {
    if (quantity <= 2) return "low";
    if (quantity === 3) return "medium";

    return "high";
  };

  const quantityLevel = getQuantityLevel(item.quantity);

  // Calculate progress percentage for the bar
  const progressPercentage = Math.min((item.quantity / 12) * 100, 100);

  return (
    <div
      className="card-animate rounded-lg bg-surface-container p-4 shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
      style={style}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize text-on-surface">{item.name}</h3>
      </div>

      <div className="mb-1 mt-3 flex items-center">
        <Layers size={18} className="mr-2 text-on-surface-variant" />
        <span className="text-sm font-medium text-on-surface">Cantidad</span>
        <span
          className={`ml-auto text-base font-semibold ${
            quantityLevel === "low"
              ? "text-error"
              : quantityLevel === "medium"
                ? "text-tertiary"
                : "text-primary"
          }`}
        >
          {item.quantity} {item.quantity === 1 ? "cubeta" : "cubetas"}
        </span>
      </div>

      <div className="mt-2 h-2.5 rounded-full bg-surface-variant">
        <div
          className={`h-2.5 rounded-full ${
            quantityLevel === "low"
              ? "bg-error"
              : quantityLevel === "medium"
                ? "bg-tertiary"
                : "bg-primary"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryCard;
