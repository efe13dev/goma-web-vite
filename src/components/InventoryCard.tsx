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
      className="card-animate bg-surface-container rounded-lg shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
      style={style}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-on-surface text-lg font-semibold capitalize">{item.name}</h3>
      </div>

      <div className="mb-1 mt-3 flex items-center">
        <Layers size={18} className="text-on-surface-variant mr-2" />
        <span className="text-on-surface text-sm font-medium">Cantidad</span>
        <span
          className={`ml-auto text-sm font-bold ${
            quantityLevel === "low"
              ? "text-error"
              : quantityLevel === "medium"
                ? "text-tertiary"
                : "text-primary"
          }`}
        >
          {item.quantity} unidades
        </span>
      </div>

      <div className="bg-surface-variant mt-2 h-2.5 rounded-full">
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
