"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Filter, Search } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterPanel } from "@/components/ui/FilterPanel";
import { CollegeCard, SkeletonCard } from "@/components/college/CollegeCard";
import { useColleges } from "@/lib/hooks/useColleges";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Button } from "@/components/ui/Button";

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [filters, setFilters] = useState({
    type: "",
    state: "",
    sortBy: "ranking",
  });
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useColleges({
    search: debouncedSearch,
    type: filters.type,
    state: filters.state,
    sortBy: filters.sortBy,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allColleges = data?.pages.flatMap(page => page.colleges) || [];
  const totalCount = data?.pages[0]?.pagination.total || 0;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Colleges</h1>
        <p className="text-text-secondary">Discover and compare top engineering and technical institutions.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Panel (Desktop & Mobile Drawer) */}
        <FilterPanel 
          isOpen={isMobileFilterOpen} 
          setIsOpen={setIsMobileFilterOpen} 
          filters={filters} 
          setFilters={setFilters} 
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Search by college name or location..." 
            />
            
            <Button 
              variant="outline" 
              className="lg:hidden flex-shrink-0"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="font-medium text-text-secondary">
              Showing <span className="text-text-primary font-bold">{totalCount}</span> results
            </p>
          </div>

          {status === "pending" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : status === "error" ? (
            <div className="glass-card p-12 text-center text-red-500">
              <p>Error loading colleges. Please try again.</p>
            </div>
          ) : allColleges.length === 0 ? (
            <div className="glass-card p-16 text-center flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-text-secondary opacity-50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No colleges found</h3>
              <p className="text-text-secondary max-w-md">
                We couldn't find any colleges matching your current filters. Try adjusting your search criteria or clearing filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSearchTerm("");
                  setFilters({ type: "", state: "", sortBy: "ranking" });
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allColleges.map((college, index) => (
                  <CollegeCard 
                    key={`${college.id}-${index}`} 
                    college={college} 
                    index={index % 12} // modulate delay for infinite scroll
                  />
                ))}
              </div>
              
              {/* Infinite Scroll trigger */}
              <div ref={ref} className="mt-12 flex justify-center p-4">
                {isFetchingNextPage ? (
                  <div className="flex gap-2 items-center text-text-secondary">
                    <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    Loading more...
                  </div>
                ) : hasNextPage ? (
                  <div className="text-text-secondary">Scroll for more</div>
                ) : (
                  <div className="text-text-secondary font-medium">You've reached the end!</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
