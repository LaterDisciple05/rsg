"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { rsgIconPack, resolveRsgIconKey } from "@/components/icons";

type ServiceIconPickerProps = {
  defaultValue?: string | null;
  label?: string;
  name?: string;
};

export function ServiceIconPicker({
  defaultValue,
  label = "Service Icon",
  name = "icon",
}: ServiceIconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(
    resolveRsgIconKey(defaultValue),
  );
  const selectedIcon =
    rsgIconPack.find((icon) => icon.key === selectedKey) ?? rsgIconPack[0];
  const SelectedIcon = selectedIcon.Icon;

  return (
    <div className="relative grid gap-2 md:col-span-2">
      <span className="text-sm font-bold text-rsg-charcoal">{label}</span>
      <input type="hidden" name={name} value={selectedKey} />

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="flex min-h-20 items-center justify-between gap-4 rounded-md border border-rsg-line bg-white px-4 py-3 text-left text-rsg-ink outline-none transition-colors hover:border-rsg-orange focus:border-rsg-orange"
      >
        <span className="flex min-w-0 items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center text-rsg-orange-dark">
            <SelectedIcon size={54} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black">
              {selectedIcon.label}
            </span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-rsg-orange-dark">
              {selectedIcon.key}
            </span>
          </span>
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-rsg-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-md border border-rsg-line bg-white p-3 shadow-xl">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {rsgIconPack.map((icon) => {
              const Icon = icon.Icon;
              const isSelected = icon.key === selectedKey;

              return (
                <button
                  key={icon.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedKey(icon.key);
                    setIsOpen(false);
                  }}
                  className={`flex min-h-20 items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-rsg-orange bg-rsg-orange-soft text-rsg-navy"
                      : "border-rsg-line bg-white text-rsg-charcoal hover:border-rsg-orange hover:bg-rsg-paper"
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center text-rsg-orange-dark">
                    <Icon size={46} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black leading-tight">
                      {icon.label}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-rsg-muted">
                      {icon.category}
                    </span>
                  </span>
                  {isSelected ? (
                    <Check size={17} className="shrink-0 text-rsg-orange-dark" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
