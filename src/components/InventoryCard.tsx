import type React from "react";
import type { InventoryItem } from "../types/inventory";

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
  const progressPercentageVisible = Math.max(progressPercentage, item.quantity > 0 ? 4 : 0);

  return (
    <div className="md-card md-card-hover card-animate p-4" style={style}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold capitalize tracking-tight text-on-surface">
          {item.name}
        </h3>
        <div className="text-right">
          <div
            className={`font-quantity text-[30px] font-bold tabular-nums leading-none tracking-tight ${
              quantityLevel === "low"
                ? "text-error"
                : quantityLevel === "medium"
                  ? "text-tertiary"
                  : "text-primary"
            }`}
          >
            {item.quantity}
          </div>
        </div>
      </div>

      <div className="mt-3 h-2.5 rounded-full bg-surface-variant">
        <div
          className={`h-2.5 rounded-full transition-[width] duration-500 ${
            quantityLevel === "low"
              ? "bg-error"
              : quantityLevel === "medium"
                ? "bg-tertiary"
                : "bg-primary"
          }`}
          style={{ width: `${progressPercentageVisible}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryCard;
