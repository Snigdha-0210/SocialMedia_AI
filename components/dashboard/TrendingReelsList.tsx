"use client";

import { TrendingUp, BarChart2, Sparkles, Play } from "lucide-react";

const TRENDING = [
  { rank: 1, title: "ChatGPT vs Claude 3 Opus", category: "AI Tech", growth: "+145%", velocity: 98, ytId: "dQw4w9WgXcQ" },
  { rank: 2, title: "Minimalist Desk Setup 2026", category: "Tech", growth: "+112%", velocity: 89, ytId: "dQw4w9WgXcQ" },
  { rank: 3, title: "Day in the life of a SWE", category: "Career", growth: "+98%", velocity: 92, ytId: "dQw4w9WgXcQ" },
  { rank: 4, title: "Healthy Meal Prep Ideas", category: "Fitness", growth: "+85%", velocity: 76, ytId: "dQw4w9WgXcQ" },
  { rank: 5, title: "How I made $10k in a week", category: "Finance", growth: "+72%", velocity: 82, ytId: "dQw4w9WgXcQ" },
];

export default function TrendingReelsList() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-[#E5E7EB]">
        <h3 className="font-semibold text-slate-900 text-[16px] tracking-tight flex items-center gap-2">
          <span>🔥</span> Trending Reels
        </h3>
        <p className="text-[13px] text-slate-500 mt-1">Top performing short-form content worldwide</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {TRENDING.map((item) => (
          <div key={item.rank} className="px-5 py-4 border-b border-[#E5E7EB]/50 last:border-0 hover:bg-slate-50/50 transition-colors group flex items-center gap-4">
            {/* Rank Badge */}
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-500 shrink-0">
              {item.rank}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <a
                href={`https://youtube.com/shorts/${item.ytId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[14px] text-slate-900 hover:text-indigo-600 truncate block mb-1 transition-colors"
              >
                {item.title}
              </a>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-semibold uppercase tracking-wider">{item.category}</span>
                <span className="text-[12px] font-medium text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {item.growth}
                </span>
                <span className="text-[12px] text-slate-400 font-medium ml-1">Vel: {item.velocity}</span>
              </div>
            </div>

            {/* Right Action */}
            <a 
              href={`/analyze?id=${item.ytId}`}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg shrink-0"
              title="Analyze Reel"
            >
              <BarChart2 className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-[#E5E7EB] bg-slate-50/50 flex gap-3">
        <button className="flex-1 py-2.5 bg-white border border-[#E5E7EB] text-slate-700 text-[13px] font-semibold rounded-[10px] hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-1.5">
          <BarChart2 className="w-4 h-4" /> Analyze All
        </button>
        <button className="flex-1 py-2.5 bg-slate-900 text-white text-[13px] font-semibold rounded-[10px] hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Create Reel
        </button>
      </div>
    </div>
  );
}
