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
        <div className="flex justify-center items-center py-8">
          <p className="text-blue-600 font-medium text-lg flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <title>Cargando</title>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Cargando datos...
          </p>
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
      {items.map((item, index) => (
        <InventoryCard
          key={item.id}
          item={item}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
};

export default InventoryList;