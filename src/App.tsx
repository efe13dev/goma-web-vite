import { RefreshCw } from "lucide-react";
import palot from "/favicon.png";

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
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-outline/20 bg-surface-container-low border-b">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex items-center">
              <img src={palot} className="mr-3 h-12 w-12" alt="Logo" />
              <h1 className="text-on-surface text-2xl font-bold">Goma Matu</h1>
            </div>
            <div className="flex w-full justify-end sm:w-auto sm:flex-none">
              <button
                type="button"
                onClick={refreshInventory}
                className="bg-primary text-on-primary hover:bg-primary/90 flex items-center rounded-full px-3 py-1.5 text-xs transition-colors"
                aria-label="Actualizar inventario"
                disabled={isLoading}
              >
                <RefreshCw size={14} className={`mr-1 ${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "Cargando..." : "Actualizar"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
