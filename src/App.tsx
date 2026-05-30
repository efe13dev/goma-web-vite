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
    <div className="min-h-screen bg-gradient-to-b from-surface-container-low via-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-outline/20 bg-surface-container-low/80 backdrop-blur supports-[backdrop-filter]:bg-surface-container-low/70">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center">
              <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-inset ring-primary/20 sm:h-12 sm:w-12">
                <img src={palot} className="h-7 w-7 sm:h-8 sm:w-8" alt="Logo" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate font-display text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
                  Goma Matu
                </h1>
                <p className="text-xs text-on-surface-variant sm:text-sm">Control de inventario</p>
              </div>
            </div>
            <button
              type="button"
              onClick={refreshInventory}
              className="md-btn md-btn-filled shrink-0 max-sm:h-10 max-sm:w-10 max-sm:p-0"
              aria-label="Actualizar inventario"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={`sm:mr-1 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isLoading ? "Cargando..." : "Actualizar"}</span>
            </button>
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
