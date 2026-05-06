"use client";

import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "./Button";
import clsx from "clsx";

interface FilterPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: {
    type: string;
    state: string;
    sortBy: string;
  };
  setFilters: (filters: any) => void;
}

const states = ["Maharashtra", "Delhi", "Tamil Nadu", "Uttar Pradesh", "West Bengal", "Karnataka", "Telangana", "Assam", "Uttarakhand", "Rajasthan", "Odisha", "Punjab", "Kerala", "Chandigarh"];
const types = ["IIT", "NIT", "IIIT", "Private", "State", "Deemed"];
const sortOptions = [
  { value: "ranking", label: "Ranking (High to Low)" },
  { value: "rating", label: "Rating (High to Low)" },
  { value: "fees_low", label: "Fees (Low to High)" },
  { value: "fees_high", label: "Fees (High to Low)" },
];

export function FilterPanel({ isOpen, setIsOpen, filters, setFilters }: FilterPanelProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev: any) => ({ ...prev, sortBy: value }));
  };

  const clearFilters = () => {
    setFilters((prev: any) => ({ ...prev, type: "", state: "", sortBy: "ranking" }));
  };

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 glass-card p-6">
          <div className="flex items-center justify-between mb-6 border-b border-border-color pb-4">
            <h2 className="font-bold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
            <button 
              onClick={clearFilters}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-text-secondary uppercase tracking-wider">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map(opt => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="sortBy"
                      checked={filters.sortBy === opt.value}
                      onChange={() => handleSortChange(opt.value)}
                      className="w-4 h-4 text-brand-600 bg-bg-secondary border-border-color focus:ring-brand-500"
                    />
                    <span className="text-sm group-hover:text-brand-600 transition-colors">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-color/50" />

            <div>
              <h3 className="text-sm font-semibold mb-3 text-text-secondary uppercase tracking-wider">Institution Type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange("type", type)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                      filters.type === type 
                        ? "bg-brand-100 border-brand-200 text-brand-700 dark:bg-brand-900/40 dark:border-brand-800 dark:text-brand-300"
                        : "bg-bg-secondary border-border-color hover:border-brand-300"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-color/50" />

            <div>
              <h3 className="text-sm font-semibold mb-3 text-text-secondary uppercase tracking-wider">State</h3>
              <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {states.map(state => (
                  <label key={state} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.state === state}
                      onChange={() => handleFilterChange("state", state)}
                      className="w-4 h-4 rounded text-brand-600 bg-bg-secondary border-border-color focus:ring-brand-500 rounded-sm"
                    />
                    <span className="text-sm group-hover:text-brand-600 transition-colors">{state}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Filter Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-bg-primary shadow-2xl lg:hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-border-color">
          <h2 className="font-bold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Same filter content as desktop */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-text-secondary uppercase tracking-wider">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="mobileSortBy"
                    checked={filters.sortBy === opt.value}
                    onChange={() => handleSortChange(opt.value)}
                    className="w-5 h-5 text-brand-600 bg-bg-secondary border-border-color"
                  />
                  <span className="text-base">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-border-color/50" />

          <div>
            <h3 className="text-sm font-semibold mb-3 text-text-secondary uppercase tracking-wider">Institution Type</h3>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => handleFilterChange("type", type)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                    filters.type === type 
                      ? "bg-brand-100 border-brand-200 text-brand-700 dark:bg-brand-900/40 dark:border-brand-800 dark:text-brand-300"
                      : "bg-bg-secondary border-border-color"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-border-color/50" />

          <div>
            <h3 className="text-sm font-semibold mb-3 text-text-secondary uppercase tracking-wider">State</h3>
            <div className="space-y-3">
              {states.map(state => (
                <label key={state} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.state === state}
                    onChange={() => handleFilterChange("state", state)}
                    className="w-5 h-5 rounded text-brand-600 bg-bg-secondary border-border-color rounded-sm"
                  />
                  <span className="text-base">{state}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border-color flex gap-3 bg-bg-primary">
          <Button variant="outline" className="flex-1" onClick={clearFilters}>Clear</Button>
          <Button className="flex-1" onClick={() => setIsOpen(false)}>Apply</Button>
        </div>
      </motion.div>
    </>
  );
}
