"use client";

import { useCompareStore } from "@/lib/stores/useCompareStore";
import { useCompare } from "@/lib/hooks/useCompare";
import { CollegeSelector } from "@/components/compare/CollegeSelector";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { X, Check, Minus, AlertCircle, TrendingUp, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ComparePage() {
  const { collegeIds, removeCollege, clearColleges } = useCompareStore();
  const { data, isLoading } = useCompare(collegeIds);

  const colleges = data?.colleges || [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Colleges</h1>
          <p className="text-text-secondary max-w-2xl">
            Select up to 3 colleges to compare their rankings, fees, placements, and more side-by-side to make the best decision.
          </p>
        </div>
        {collegeIds.length > 0 && (
          <Button variant="ghost" onClick={clearColleges}>
            Clear All
          </Button>
        )}
      </div>

      <div className="mb-10 max-w-2xl">
        <CollegeSelector />
        <p className="text-sm text-text-secondary mt-2">
          {collegeIds.length}/3 colleges selected for comparison
        </p>
      </div>

      {collegeIds.length === 0 ? (
        <div className="glass-card p-16 text-center flex flex-col items-center justify-center min-h-[40vh]">
          <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-brand-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No colleges selected</h3>
          <p className="text-text-secondary max-w-md">
            Search and select colleges using the search bar above to start comparing them side-by-side.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto pb-6 custom-scrollbar">
          <div className="min-w-[800px] grid" style={{ gridTemplateColumns: `repeat(${colleges.length}, minmax(300px, 1fr))` }}>
            {/* Header Row */}
            <div className="contents">
              {colleges.map((college, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={`header-${college.id}`} 
                  className="p-4 relative"
                >
                  <GlassCard className="h-full p-6 flex flex-col relative overflow-visible">
                    <button 
                      onClick={() => removeCollege(college.id)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="h-32 bg-brand-200 dark:bg-border-color rounded-xl mb-4 relative overflow-hidden shrink-0 group">
                      <img 
                        src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400"} 
                        alt={college.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{college.name}</h3>
                    <p className="text-sm text-text-secondary flex items-center gap-1 mb-4">
                      <MapPin className="w-4 h-4" /> {college.city}, {college.state}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/college/${college.id}`} className="text-brand-600 dark:text-brand-400 text-sm font-medium hover:underline">
                        View Full Details &rarr;
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="col-span-full mt-8 mb-4 px-4">
              <h3 className="text-xl font-bold border-b border-border-color pb-2">Quick Stats</h3>
            </div>
            <div className="contents">
              {colleges.map(college => (
                <div key={`stats-${college.id}`} className="p-4 space-y-4 border-r border-border-color last:border-0">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Ranking</p>
                    <p className="font-bold text-lg">{college.ranking ? `#${college.ranking}` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Rating</p>
                    <p className="font-bold text-lg">{college.rating} / 5.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Type</p>
                    <p className="font-bold">{college.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Campus Size</p>
                    <p className="font-bold">{college.campusSize || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Placements */}
            <div className="col-span-full mt-8 mb-4 px-4">
              <h3 className="text-xl font-bold border-b border-border-color pb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-500" />
                Latest Placements
              </h3>
            </div>
            <div className="contents">
              {colleges.map(college => {
                const placement = college.placements[0];
                return (
                  <div key={`placements-${college.id}`} className="p-4 space-y-4 border-r border-border-color last:border-0">
                    {placement ? (
                      <>
                        <div>
                          <p className="text-sm text-text-secondary mb-1">Average Package</p>
                          <p className="font-bold text-lg text-brand-600 dark:text-brand-400">₹{placement.averagePackage} LPA</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary mb-1">Highest Package</p>
                          <p className="font-bold text-lg text-accent-600 dark:text-accent-400">₹{placement.highestPackage} LPA</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary mb-1">Placement Rate</p>
                          <p className="font-bold text-green-600 dark:text-green-400">{placement.placementRate}%</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-text-secondary italic">Data not available</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Fees */}
            <div className="col-span-full mt-8 mb-4 px-4">
              <h3 className="text-xl font-bold border-b border-border-color pb-2">Annual Fees (B.Tech)</h3>
            </div>
            <div className="contents">
              {colleges.map(college => (
                <div key={`fees-${college.id}`} className="p-4 border-r border-border-color last:border-0">
                  <p className="font-bold text-2xl">₹{(college.fees / 100000).toFixed(1)} Lakhs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
