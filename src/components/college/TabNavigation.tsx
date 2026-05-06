"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabNavigation({ tabs, activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="flex overflow-x-auto custom-scrollbar border-b border-border-color sticky top-[72px] z-30 bg-bg-primary/80 backdrop-blur-md pt-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={clsx(
            "relative px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors outline-none",
            activeTab === tab 
              ? "text-brand-600 dark:text-brand-400" 
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-t-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
