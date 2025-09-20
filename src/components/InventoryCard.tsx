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
      className="card-animate rounded-lg bg-white p-5 shadow-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
      style={style}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize text-gray-800">{item.name}</h3>
      </div>

      <div className="mb-1 mt-3 flex items-center">
        <Layers size={18} className="mr-2 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Cantidad</span>
        <span
          className={`ml-auto text-sm font-bold ${
            quantityLevel === "low"
              ? "text-red-500"
              : quantityLevel === "medium"
                ? "text-amber-500"
                : "text-green-600"
          }`}
        >
          {item.quantity} unidades
        </span>
      </div>

      <div className="mt-2 h-2.5 rounded-full bg-gray-200">
        <div
          className={`h-2.5 rounded-full ${
            quantityLevel === "low"
              ? "bg-red-500"
              : quantityLevel === "medium"
                ? "bg-amber-500"
                : "bg-green-600"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryCard;
