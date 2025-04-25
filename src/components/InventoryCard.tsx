import type React from 'react';
import type { InventoryItem } from '../types/inventory';
import { Package } from 'lucide-react';

interface InventoryCardProps {
  item: InventoryItem;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item }) => {
  // Determine quantity level for styling
  const getQuantityLevel = (quantity: number): string => {
    if (quantity <= 2) return 'low';
    if (quantity === 3) return 'medium';
    return 'high';
  };

  const quantityLevel = getQuantityLevel(item.quantity);
  
  // Calculate progress percentage for the bar
  const progressPercentage = Math.min((item.quantity / 12) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold capitalize text-gray-800">{item.name}</h3>
      </div>
      
      <div className="flex items-center mt-3 mb-1">
        <Package size={18} className="text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Cantidad</span>
        <span className={`ml-auto font-bold text-sm ${
          quantityLevel === 'low' ? 'text-red-500' : 
          quantityLevel === 'medium' ? 'text-amber-500' : 
          'text-green-600'
        }`}>
          {item.quantity} unidades
        </span>
      </div>
      
      <div className="mt-2 bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${
            quantityLevel === 'low' ? 'bg-red-500' : 
            quantityLevel === 'medium' ? 'bg-amber-500' : 
            'bg-green-600'
          }`} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryCard;