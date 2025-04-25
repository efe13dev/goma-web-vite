import type React from 'react';
import type { InventoryItem } from '../types/inventory';
import InventoryCard from './InventoryCard';

interface InventoryListProps {
  items: InventoryItem[];
  isLoading: boolean;
  hasError?: boolean;
}

// Crear un array de IDs únicos para los esqueletos de carga
const SKELETON_IDS = ['sk1', 'sk2', 'sk3', 'sk4', 'sk5'];

const InventoryList: React.FC<InventoryListProps> = ({ items, isLoading, hasError = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <p className="text-blue-600 font-medium text-lg">Cargando datos...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
          {SKELETON_IDS.map((id) => (
            <div 
              key={id} 
              className="bg-gray-100 rounded-lg p-5 h-32" 
            />
          ))}
        </div>
      </div>
    );
  }

  // No mostrar "No items found" si hay un error
  if (items.length === 0 && !hasError) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <InventoryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryList;