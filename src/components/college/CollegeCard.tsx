import Link from "next/link";
import { MapPin, Star, Building2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { CollegeWithDetails } from "@/lib/hooks/useColleges";

export function CollegeCard({ college, index = 0 }: { college: CollegeWithDetails; index?: number }) {
  return (
    <GlassCard hoverEffect delay={index * 0.05} className="flex flex-col h-full">
      <Link href={`/college/${college.id}`} className="flex flex-col flex-grow">
        <div className="h-48 bg-brand-200 dark:bg-border-color relative overflow-hidden group">
          <img 
            src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"} 
            alt={college.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium border border-white/30">
              {college.type}
            </div>
            <div className="flex items-center gap-1 text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold">{college.rating}</span>
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-1 line-clamp-2">{college.name}</h3>
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-4">
            <MapPin className="w-4 h-4" />
            {college.city}, {college.state}
          </div>
          
          <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-border-color/50">
            <div>
              <p className="text-xs text-text-secondary mb-1">Avg Package</p>
              <p className="font-semibold text-brand-600 dark:text-brand-400 text-sm">
                {college.placements[0]?.averagePackage ? `₹${college.placements[0].averagePackage} LPA` : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Annual Fees</p>
              <p className="font-semibold text-sm">
                ₹{(college.fees / 100000).toFixed(1)} L
              </p>
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}

export function SkeletonCard() {
  return (
    <GlassCard className="flex flex-col h-[350px]">
      <div className="h-48 bg-border-color shimmer relative" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-6 w-3/4 bg-border-color shimmer rounded mb-2" />
        <div className="h-4 w-1/2 bg-border-color shimmer rounded mb-4" />
        <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-border-color/50">
          <div>
            <div className="h-3 w-16 bg-border-color shimmer rounded mb-1" />
            <div className="h-4 w-20 bg-border-color shimmer rounded" />
          </div>
          <div>
            <div className="h-3 w-16 bg-border-color shimmer rounded mb-1" />
            <div className="h-4 w-20 bg-border-color shimmer rounded" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
