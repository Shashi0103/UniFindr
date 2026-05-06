"use client";

import { use, useState } from "react";
import { useCollege } from "@/lib/hooks/useCollege";
import { TabNavigation } from "@/components/college/TabNavigation";
import { PlacementChart } from "@/components/college/PlacementChart";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CollegeCard } from "@/components/college/CollegeCard";
import { MapPin, Star, Link as LinkIcon, Building, GraduationCap, ArrowRight, User, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data, isLoading, error } = useCollege(resolvedParams.id);
  const [activeTab, setActiveTab] = useState("Overview");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">College not found</h2>
        <Button href="/colleges">Browse Colleges</Button>
      </div>
    );
  }

  const { college, similarColleges } = data;
  const latestPlacement = college.placements[0];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] bg-bg-secondary flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"} 
            alt={`${college.name} campus`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                  {college.type}
                </span>
                <span className="flex items-center gap-1 text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{college.rating}</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {college.city}, {college.state}
                </span>
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  Est. {college.established}
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <a href={college.website} target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all">
                    Visit Website
                  </a>
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 glass">
                Save
              </Button>
              <Button>Apply Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <TabNavigation 
            tabs={["Overview", "Courses & Fees", "Placements", "Reviews"]} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />

          <div className="pt-8 min-h-[50vh]">
            {activeTab === "Overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <section>
                  <h3 className="text-2xl font-bold mb-4">About {college.name}</h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {college.description}
                  </p>
                </section>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Campus Size", value: college.campusSize || "N/A" },
                    { label: "Approved By", value: college.approved },
                    { label: "Institute Type", value: college.type },
                    { label: "Ranking", value: college.ranking ? `#${college.ranking}` : "N/A" },
                  ].map((stat, i) => (
                    <GlassCard key={i} className="p-4 flex flex-col justify-center items-center text-center">
                      <p className="text-xs text-text-secondary mb-1 uppercase tracking-wider font-semibold">{stat.label}</p>
                      <p className="font-bold text-lg">{stat.value}</p>
                    </GlassCard>
                  ))}
                </div>

                {latestPlacement && (
                  <section className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-500" />
                      Placement Highlights ({latestPlacement.year})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Highest Package</p>
                        <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">₹{latestPlacement.highestPackage}L</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Average Package</p>
                        <p className="text-2xl font-bold">₹{latestPlacement.averagePackage}L</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Median Package</p>
                        <p className="text-2xl font-bold">₹{latestPlacement.medianPackage}L</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Placement Rate</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{latestPlacement.placementRate}%</p>
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            )}

            {activeTab === "Courses & Fees" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Courses Offered</h3>
                <div className="space-y-4">
                  {college.courses.map((course, i) => (
                    <GlassCard key={i} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-brand-500" />
                            {course.name}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                            <span>Duration: {course.duration}</span>
                            {course.seats && <span>Seats: {course.seats}</span>}
                          </div>
                        </div>
                        <div className="md:text-right">
                          <p className="text-sm text-text-secondary mb-1">Total Fees</p>
                          <p className="text-xl font-bold text-brand-600 dark:text-brand-400">
                            ₹{(course.fees / 100000).toFixed(2)} Lakhs
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "Placements" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-2">Placement Statistics</h3>
                <p className="text-text-secondary mb-8">Historical placement data showing average and highest packages over the years.</p>
                
                <GlassCard className="p-4 md:p-6 mb-8">
                  <PlacementChart data={college.placements} />
                </GlassCard>

                <h4 className="text-xl font-bold mb-4">Top Recruiters</h4>
                <div className="flex flex-wrap gap-3">
                  {latestPlacement && JSON.parse(latestPlacement.topRecruiters).map((recruiter: string, i: number) => (
                    <div key={i} className="px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-sm font-medium">
                      {recruiter}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "Reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Student Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="grid gap-6">
                  {college.reviews.map((review, i) => (
                    <GlassCard key={i} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold">{review.author}</p>
                            <p className="text-xs text-text-secondary">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded-md text-sm font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          {review.rating}
                        </div>
                      </div>
                      <h4 className="font-bold mb-2">{review.title}</h4>
                      <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-500" />
              Admission Predictor
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Check your chances of getting into {college.name} based on your exam rank.
            </p>
            <Button href="/predict" className="w-full">
              Predict Admission Chances
            </Button>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <p className="text-sm text-text-secondary mb-4">
              Get personalized counseling from our experts to make the right choice.
            </p>
            <Button variant="outline" className="w-full">
              Talk to an Expert
            </Button>
          </GlassCard>

          {similarColleges.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 mt-8 flex items-center gap-2">
                Similar Institutions
              </h3>
              <div className="space-y-4">
                {similarColleges.map((sc) => (
                  <Link href={`/college/${sc.id}`} key={sc.id} className="block group">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent group-hover:border-border-color">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img 
                          src={sc.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200"} 
                          alt={sc.name} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{sc.name}</h4>
                        <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {sc.rating} • {sc.city}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
