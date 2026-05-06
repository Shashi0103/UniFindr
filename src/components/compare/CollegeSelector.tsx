"use client";

import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useCompareStore } from "@/lib/stores/useCompareStore";
import { GlassCard } from "@/components/ui/GlassCard";

export function CollegeSelector() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { collegeIds, addCollege } = useCompareStore();

  const { data, isLoading } = useQuery({
    queryKey: ["college-search", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return { colleges: [] };
      const res = await fetch(`/api/colleges?search=${debouncedSearch}&limit=5`);
      if (!res.ok) throw new Error("Search failed");
      return await res.json();
    },
    enabled: debouncedSearch.length > 2,
  });

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-primary focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          placeholder="Search colleges to add..."
          disabled={collegeIds.length >= 3}
        />
        {searchTerm && (
          <button 
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-text-primary"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {searchTerm.length > 2 && (
        <GlassCard className="absolute top-full left-0 right-0 mt-2 p-2 z-50 max-h-60 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-text-secondary">Searching...</div>
          ) : data?.colleges?.length === 0 ? (
            <div className="p-4 text-center text-sm text-text-secondary">No colleges found.</div>
          ) : (
            <div className="space-y-1">
              {data?.colleges?.map((college: any) => {
                const isSelected = collegeIds.includes(college.id);
                return (
                  <button
                    key={college.id}
                    disabled={isSelected || collegeIds.length >= 3}
                    onClick={() => {
                      addCollege(college.id);
                      setSearchTerm("");
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div>
                      <p className="font-semibold text-sm line-clamp-1">{college.name}</p>
                      <p className="text-xs text-text-secondary">{college.city}, {college.state}</p>
                    </div>
                    {!isSelected && (
                      <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-4 h-4" />
                      </div>
                    )}
                    {isSelected && (
                      <span className="text-xs font-medium text-brand-600 dark:text-brand-400">Added</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}
