"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-primary focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm focus:shadow-glow"
        placeholder={placeholder}
      />
    </div>
  );
}
