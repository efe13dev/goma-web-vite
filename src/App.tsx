import type { InventoryItem } from "./types/inventory";

import palot from "/favicon.png";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

import ErrorMessage from "./components/ErrorMessage";
import FormulaModal from "./components/FormulaModal";
import InventoryList from "./components/InventoryList";
import { useInventory } from "./hooks/useInventory";
import { findFormulaForItem } from "./services/inventoryService";

function App() {
  const { items, formulas, isLoading, error, skeletonCount, refreshInventory } = useInventory();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-outline/60 bg-surface-container-low/85 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-outline/70 bg-surface-variant/70 shadow-sm sm:h-11 sm:w-11">
                <img src={palot} className="h-6 w-6 sm:h-7 sm:w-7" alt="Logo" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate font-display text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
                  Goma Matu
                </h1>
                <p className="text-sm font-medium text-on-surface-variant">Control de inventario</p>
              </div>
            </div>
            <button
              type="button"
              onClick={refreshInventory}
              className="md-btn md-btn-filled shrink-0 max-sm:h-9 max-sm:w-9 max-sm:p-0"
              aria-label="Actualizar inventario"
              disabled={isLoading}
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">{isLoading ? "Cargando..." : "Actualizar"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Status and Error Messages */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={refreshInventory} />
          </div>
        )}

        {/* Inventory Cards */}
        <InventoryList
          items={items}
          isLoading={isLoading}
          onSelectItem={setSelectedItem}
          hasError={!!error}
          skeletonCount={skeletonCount}
        />
      </main>

      {selectedItem && (
        <FormulaModal
          item={selectedItem}
          formula={findFormulaForItem(formulas, selectedItem.name)}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default App;
