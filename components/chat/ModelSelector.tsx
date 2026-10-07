"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Sparkles, Zap, BrainCircuit, Check } from "lucide-react";
import { MindoraModel, DEFAULT_MODELS } from "@/lib/ai/models";
import { cn } from "@/lib/utils/cn";

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  models?: MindoraModel[];
  className?: string;
}

export function ModelSelector({
  selectedModelId,
  onSelectModel,
  models = DEFAULT_MODELS,
  className,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentModel =
    models.find((m) => m.id === selectedModelId) || models[0] || DEFAULT_MODELS[1];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-500" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition-all select-none"
      >
        <div className="flex items-center justify-center w-5 h-5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          {getModelIcon(currentModel.iconName)}
        </div>
        <span className="font-semibold">{currentModel.name}</span>
        {currentModel.badge && (
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            {currentModel.badge}
          </span>
        )}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Select Mindora Model
          </div>
          <div className="space-y-1">
            {models.map((model) => {
              const isSelected = model.id === currentModel.id;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    onSelectModel(model.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition-colors",
                    isSelected
                      ? "bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/60"
                      : "hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {getModelIcon(model.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                        {model.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {model.description}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <span>Speed: {model.speedRating}</span>
                      <span>•</span>
                      <span>Quality: {model.qualityRating}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
