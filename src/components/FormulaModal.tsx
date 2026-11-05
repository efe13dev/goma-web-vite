import type { Formula, InventoryItem } from "../types/inventory";
import type React from "react";

import { FlaskConical, X } from "lucide-react";
import { useEffect } from "react";

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-[2px] sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="formula-modal-title"
    >
      <div
        className="sheet-animate flex max-h-[85dvh] w-full flex-col rounded-t-3xl border border-outline/20 bg-background p-5 shadow-2xl sm:max-w-md sm:rounded-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-outline/30 sm:hidden" />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <FlaskConical size={20} />
            </div>
            <div className="min-w-0">
              <h2
                id="formula-modal-title"
                className="truncate font-display text-lg font-bold capitalize tracking-tight text-on-surface"
              >
                {item.name}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {ingredients.length > 0
                  ? `Fórmula · ${ingredients.length} ingredientes`
                  : "Fórmula no disponible"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-outline/20 hover:text-on-surface"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          {ingredients.length === 0 ? (
            <div className="rounded-xl border border-outline/15 bg-surface-container-low px-4 py-8 text-center text-sm text-on-surface-variant">
              No se encontraron ingredientes registrados para este color.
            </div>
          ) : (
            <ul className="divide-y divide-outline/15 overflow-hidden rounded-xl border border-outline/15 bg-surface-container-low">
              {ingredients.map((ingredient) => {
                const { label, unit } = parseIngredientName(ingredient.name);

                return (
                  <li
                    key={ingredient.id}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <span className="min-w-0 truncate text-sm font-medium capitalize text-on-surface">
                      {label}
                    </span>
                    <div className="flex shrink-0 items-baseline gap-1">
                      <span className="font-quantity text-base font-bold tabular-nums text-on-surface">
                        {ingredient.quantity}
                      </span>
                      {unit && (
                        <span className="w-6 text-left text-xs font-medium text-on-surface-variant">
                          {unit}
                        </span>
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
