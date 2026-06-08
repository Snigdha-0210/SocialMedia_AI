"use client";

import { TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

// Mock data for sparklines
const generateData = (trend: "up" | "flat" | "down") => {
  const data = [];
  let val = 50;
  for (let i = 0; i < 10; i++) {
    if (trend === "up") val += Math.random() * 10;
    else if (trend === "down") val -= Math.random() * 10;
    else val += (Math.random() - 0.5) * 10;
    data.push({ value: val });
  }
  return data;
};

const CATEGORIES = [
  { name: "AI Tools", views: "142M", growth: "+45%", reels: "1.2K", strength: 98, data: generateData("up") },
  { name: "Finance", views: "98M", growth: "+32%", reels: "843", strength: 85, data: generateData("up") },
  { name: "Fitness", views: "210M", growth: "+12%", reels: "2.4K", strength: 82, data: generateData("flat") },
  { name: "Tech Review", views: "85M", growth: "+28%", reels: "620", strength: 79, data: generateData("up") },
  { name: "Cooking", views: "150M", growth: "+8%", reels: "1.8K", strength: 71, data: generateData("flat") },
];

export default function CategoryRankings() {
  return (
    <section>
      <h2 className="text-[20px] font-semibold tracking-tight text-slate-900 mb-6 flex items-center gap-2">
        📊 Category Performance Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-[15px]">{cat.name}</h3>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-[6px]">
                <TrendingUp className="w-3 h-3" /> {cat.growth}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-slate-500">Views</span>
                <span className="font-bold text-[14px] text-slate-900 tabular-nums">{cat.views}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-slate-500">Active Reels</span>
                <span className="font-bold text-[14px] text-slate-900 tabular-nums">{cat.reels}</span>
              </div>
            </div>

            {/* Sparkline */}
            <div className="h-10 w-full mb-4 opacity-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cat.data}>
                  <YAxis domain={['auto', 'auto']} hide />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={cat.strength > 85 ? "#10b981" : "#6366f1"} 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Trend Strength
                </span>
                <span className="text-[12px] font-bold text-indigo-600 tabular-nums">{cat.strength}/100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    cat.strength > 90 ? "bg-indigo-500" : cat.strength > 80 ? "bg-blue-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${cat.strength}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
