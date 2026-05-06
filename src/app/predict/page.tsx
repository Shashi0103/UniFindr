"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Search, Trophy, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type PredictionResult = {
  High: any[];
  Medium: any[];
  Low: any[];
};

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank || isNaN(Number(rank))) {
      setError("Please enter a valid rank number");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam, rank: parseInt(rank) }),
      });

      if (!res.ok) throw new Error("Prediction failed");
      
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      setError("An error occurred while fetching predictions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ResultSection = ({ title, colleges, chance, icon: Icon, colorClass, bgClass }: any) => {
    if (!colleges || colleges.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${colorClass}`}>
          <Icon className="w-6 h-6" />
          {title} ({colleges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colleges.map((college: any) => (
            <Link key={college.id} href={`/college/${college.id}`}>
              <GlassCard hoverEffect className={`p-4 border-l-4 ${bgClass}`}>
                <h4 className="font-bold text-lg mb-1 truncate">{college.name}</h4>
                <p className="text-sm text-text-secondary">{college.city}, {college.state}</p>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="font-medium bg-bg-secondary px-2 py-1 rounded">Rank: #{college.ranking}</span>
                  <span className={`font-bold ${colorClass}`}>{chance} Chance</span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">College Predictor</h1>
        <p className="text-lg text-text-secondary">
          Enter your competitive exam rank to predict which colleges you have a chance of getting into.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-6 md:p-8 mb-12">
          <form onSubmit={handlePredict} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-text-secondary mb-2">Select Exam</label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-primary focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              >
                <option value="JEE Main" className="text-slate-900 dark:text-slate-900">JEE Main</option>
                <option value="JEE Advanced" className="text-slate-900 dark:text-slate-900">JEE Advanced</option>
                <option value="BITSAT" className="text-slate-900 dark:text-slate-900">BITSAT</option>
                <option value="MHT CET" className="text-slate-900 dark:text-slate-900">MHT CET</option>
                <option value="KCET" className="text-slate-900 dark:text-slate-900">KCET</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-text-secondary mb-2">Your Rank</label>
              <input
                type="number"
                min="1"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-primary focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
            </div>
            
            <div className="w-full md:w-1/3">
              <Button type="submit" className="w-full h-[50px]" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Predicting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Predict My Colleges
                  </span>
                )}
              </Button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4 text-sm font-medium text-center">{error}</p>}
        </GlassCard>

        <AnimatePresence mode="wait">
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Prediction Results</h2>
                <p className="text-text-secondary">Based on historical data for {exam} rank {rank}</p>
              </div>

              {results.High.length === 0 && results.Medium.length === 0 && results.Low.length === 0 ? (
                <div className="text-center p-8 bg-bg-secondary rounded-2xl">
                  <p className="text-lg font-medium">No colleges found for this rank in our database.</p>
                </div>
              ) : (
                <>
                  <ResultSection 
                    title="High Chance (Safe)" 
                    colleges={results.High} 
                    chance="High"
                    icon={CheckCircle2}
                    colorClass="text-green-500"
                    bgClass="border-l-green-500"
                  />
                  <ResultSection 
                    title="Medium Chance (Moderate)" 
                    colleges={results.Medium} 
                    chance="Medium"
                    icon={HelpCircle}
                    colorClass="text-yellow-500"
                    bgClass="border-l-yellow-500"
                  />
                  <ResultSection 
                    title="Low Chance (Tough)" 
                    colleges={results.Low} 
                    chance="Low"
                    icon={AlertCircle}
                    colorClass="text-red-500"
                    bgClass="border-l-red-500"
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
