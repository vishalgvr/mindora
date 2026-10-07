import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
  description?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  label,
  description,
}: SwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {description}
            </span>
          )}
        </div>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
