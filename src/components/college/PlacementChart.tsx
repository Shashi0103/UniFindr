"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Placement } from "@prisma/client";
import { useThemeStore } from "@/lib/stores/useThemeStore";

export function PlacementChart({ data }: { data: Placement[] }) {
  const { theme } = useThemeStore();
  const sortedData = [...data].sort((a, b) => a.year - b.year);
  
  const textColor = theme === "dark" ? "#94a3b8" : "#475569";
  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";

  return (
    <div className="h-80 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `₹${value}L`}
            dx={-10}
          />
          <Tooltip 
            cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f1f5f9' }}
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
              borderColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
              borderRadius: '0.75rem',
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            formatter={(value: any) => [`₹${value} LPA`, 'Package']}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="averagePackage" name="Average Package" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50} />
          <Bar dataKey="highestPackage" name="Highest Package" fill="#d946ef" radius={[4, 4, 0, 0]} maxBarSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
