import React from 'react';
import { Box, LayoutGrid, RefreshCw } from 'lucide-react';
import InventoryList from './components/InventoryList';
import SortDropdown from './components/SortDropdown';
import ErrorMessage from './components/ErrorMessage';
import { useInventory } from './hooks/useInventory';

function App() {
  const { 
    items, 
    isLoading, 
    error, 
    sortBy, 
    sortDirection, 
    setSorting,
    refreshInventory 
  } = useInventory();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <Box className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Goma Matu</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={refreshInventory}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Actualizar inventario"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Cargando...' : 'Actualizar'}</span>
              </button>
              <div className="flex items-center text-sm text-gray-500">
                <LayoutGrid size={16} className="mr-1" /> 
                <span>{items.length} items</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <SortDropdown 
            sortBy={sortBy} 
            sortDirection={sortDirection} 
            onSortChange={setSorting} 
          />
        </div>
        
        {/* Status and Error Messages */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}
        
        {/* Inventory Cards */}
        <InventoryList items={items} isLoading={isLoading} hasError={!!error} />
      </main>
    </div>
  );
}

export default App;