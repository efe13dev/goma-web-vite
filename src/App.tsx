import palot from "/favicon.png";
import { RefreshCw } from "lucide-react";

import InventoryList from "./components/InventoryList";
// import SortDropdown from "./components/SortDropdown"; // Desactivado temporalmente
import ErrorMessage from "./components/ErrorMessage";
import { useInventory } from "./hooks/useInventory";

function App() {
  const {
    items,
    isLoading,
    error,
    // sortBy, // Desactivado temporalmente
    // sortDirection, // Desactivado temporalmente
    // setSorting, // Desactivado temporalmente
    refreshInventory,
  } = useInventory();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex items-center">
              <img src={palot} className="mr-3 h-12 w-12" alt="Logo" />
              <h1 className="text-xl font-bold text-gray-900">Goma Matu</h1>
            </div>
            <div className="flex w-full justify-end sm:w-auto sm:flex-none">
              <button
                type="button"
                onClick={refreshInventory}
                className="flex items-center text-sm text-blue-600 transition-colors hover:text-blue-800"
                aria-label="Actualizar inventario"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={`mr-1 ${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "Cargando..." : "Actualizar"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls */}
        {/* Filtro de ordenar desactivado temporalmente - descomentar para reactivar
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
					<SortDropdown
						sortBy={sortBy}
						sortDirection={sortDirection}
						onSortChange={setSorting}
					/>
				</div>
				*/}

        {/* Status and Error Messages */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={refreshInventory} />
          </div>
        )}

        {/* Inventory Cards */}
        <InventoryList items={items} isLoading={isLoading} hasError={!!error} />
      </main>
    </div>
  );
}

export default App;
