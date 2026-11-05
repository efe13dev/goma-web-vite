import type { Formula, InventoryItem } from "../types/inventory";
import type React from "react";

import { X } from "lucide-react";
import { useEffect } from "react";

import { getColorSwatch } from "../services/inventoryService";

interface FormulaModalProps {
  item: InventoryItem;
  formula?: Formula;
  onClose: () => void;
}

const parseIngredientName = (rawName: string): { label: string; unit: string } => {
  const match = rawName.match(/^(.*?)\s*\[([^\]]+)\]$/);

  if (!match) {
    return { label: rawName.trim(), unit: "" };
  }

  return { label: match[1].trim(), unit: match[2].trim() };
};

const FormulaModal: React.FC<FormulaModalProps> = ({ item, formula, onClose }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const ingredients = formula?.ingredients ?? [];
  const swatchColor = getColorSwatch(item.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-on-surface/35 backdrop-blur-[2px] sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="formula-modal-title"
    >
      <div
        className="sheet-animate flex max-h-[85dvh] w-full flex-col rounded-t-3xl border border-outline/60 bg-surface-container p-5 shadow-2xl sm:max-w-md sm:rounded-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 shrink-0 rounded-full bg-outline/70 sm:hidden" />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-outline/60 bg-surface-variant">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-black/15"
                style={{ backgroundColor: swatchColor }}
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <h2
                id="formula-modal-title"
                className="truncate font-display text-lg font-bold capitalize tracking-tight text-on-surface"
              >
                {item.name}
              </h2>
              <p className="text-xs font-medium text-on-surface-variant">
                {ingredients.length > 0
                  ? `Fórmula · ${ingredients.length} ingredientes`
                  : "Fórmula no disponible"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-outline/50 bg-surface-variant/60 text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-on-surface"
            aria-label="Cerrar"
          >
            <X size={17} />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          {ingredients.length === 0 ? (
            <div className="rounded-xl border border-outline/50 bg-background px-4 py-8 text-center text-sm text-on-surface-variant">
              No se encontraron ingredientes registrados para este color.
            </div>
          ) : (
            <ul className="divide-y divide-outline/40 overflow-hidden rounded-xl border border-outline/60 bg-background">
              {ingredients.map((ingredient) => {
                const { label, unit } = parseIngredientName(ingredient.name);

                return (
                  <li
                    key={ingredient.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-container"
                  >
                    <span className="min-w-0 truncate text-sm font-medium capitalize text-on-surface">
                      {label}
                    </span>
                    <div className="inline-flex shrink-0 items-baseline gap-1 rounded-md border border-outline/50 bg-surface-container px-2 py-0.5">
                      <span className="font-quantity text-sm font-semibold tabular-nums text-on-surface">
                        {ingredient.quantity}
                      </span>
                      {unit && (
                        <span className="text-xs font-medium text-on-surface-variant">{unit}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaModal;
