import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, MapPin, Star, TrendingUp, Users, BookOpen } from "lucide-react";

export const revalidate = 3600; // revalidate every hour

async function getFeaturedColleges() {
  return await prisma.college.findMany({
    take: 6,
    orderBy: { ranking: "asc" },
    include: {
      courses: { take: 1 },
      placements: { take: 1, orderBy: { year: "desc" } }
    }
  });
}

export default async function Home() {
  const featuredColleges = await getFeaturedColleges();

  return (
    <div className="flex flex-col w-full relative">
      <MouseGlow />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/30 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500/30 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
        
        <div className="container mx-auto px-4 md:px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Discover Your <br className="hidden md:block" />
            <span className="text-gradient">Dream College</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Make data-driven decisions about your future. Explore, compare, and predict admissions for top institutions across India.
          </p>
          
          {/* Floating Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass-card flex items-center p-2 rounded-2xl bg-bg-primary/80 dark:bg-bg-secondary/80">
              <div className="pl-4 text-text-secondary">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Search colleges, courses, or locations..." 
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg"
              />
              <Button href="/colleges" className="rounded-xl px-8">
                Search
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
            <div className="flex -space-x-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary bg-brand-200 dark:bg-brand-800 flex items-center justify-center z-10">
                  <span className="text-xs font-bold">{i}</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-text-secondary">
              Trusted by <span className="font-bold text-text-primary">10,000+</span> students
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, label: "Top Colleges", value: "500+" },
              { icon: MapPin, label: "Cities Covered", value: "50+" },
              { icon: TrendingUp, label: "Placement Records", value: "10k+" },
              { icon: Users, label: "Student Reviews", value: "25k+" },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-6 text-center" delay={i * 0.1}>
                <div className="mx-auto w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-text-secondary font-medium">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Institutions</h2>
              <p className="text-text-secondary max-w-2xl">Explore India's premier engineering and technical institutions known for their academic excellence and outstanding placement records.</p>
            </div>
            <Button href="/colleges" variant="outline" className="hidden md:inline-flex">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredColleges.map((college, i) => (
              <GlassCard key={college.id} hoverEffect delay={i * 0.1} className="flex flex-col">
                <Link href={`/college/${college.id}`}>
                  <div className="h-48 bg-brand-200 dark:bg-border-color relative overflow-hidden group-hover:shadow-inner transition-all">
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
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{college.name}</h3>
                    <div className="flex items-center gap-2 text-text-secondary text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {college.location}
                    </div>
                    
                    <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-border-color">
                      <div>
                        <p className="text-xs text-text-secondary mb-1">Avg Package</p>
                        <p className="font-bold text-brand-600 dark:text-brand-400">
                          {college.placements[0]?.averagePackage ? `₹${college.placements[0].averagePackage} LPA` : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary mb-1">Annual Fees</p>
                        <p className="font-bold">
                          ₹{(college.fees / 100000).toFixed(1)} L
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </GlassCard>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Button href="/colleges" variant="outline">
              View All Colleges
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 dark:opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Confused about your chances?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-text-secondary">
            Use our AI-powered predictor tool to find out which colleges you can get into based on your exam rank.
          </p>
          <Button href="/predict" size="lg" className="px-10">
            Try College Predictor
          </Button>
        </div>
      </section>
    </div>
  );
}
