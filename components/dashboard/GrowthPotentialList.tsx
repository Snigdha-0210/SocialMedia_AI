"use client";

import { TrendingUp, Activity } from "lucide-react";

const GROWTH_DATA = [
  { title: "Apple Vision Pro 2 Leaks", views: "5.2M views", forecast: "+405%", confidence: 98, ytId: "dQw4w9WgXcQ" },
  { title: "New Gym Shark Haul", views: "2.1M views", forecast: "+312%", confidence: 94, ytId: "dQw4w9WgXcQ" },
  { title: "Stripe UI Clone Tutorial", views: "1.8M views", forecast: "+285%", confidence: 91, ytId: "dQw4w9WgXcQ" },
  { title: "Best Notion Templates 2026", views: "1.2M views", forecast: "+190%", confidence: 88, ytId: "dQw4w9WgXcQ" },
  { title: "I built an AI in 24 hours", views: "3.5M views", forecast: "+175%", confidence: 85, ytId: "dQw4w9WgXcQ" },
];

export default function GrowthPotentialList() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-[#E5E7EB]">
        <h3 className="font-semibold text-slate-900 text-[16px] tracking-tight flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" /> Highest Growth Potential
        </h3>
        <p className="text-[13px] text-slate-500 mt-1">AI-predicted breakout opportunities</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {GROWTH_DATA.map((item, i) => (
          <div key={i} className="px-5 py-4 border-b border-[#E5E7EB]/50 last:border-0 hover:bg-slate-50/50 transition-colors flex items-center gap-4">
            {/* Left Content */}
            <div className="flex-1 min-w-0">
              <a
                href={`https://youtube.com/shorts/${item.ytId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[14px] text-slate-900 hover:text-indigo-600 truncate block mb-1.5 transition-colors"
              >
                {item.title}
              </a>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-slate-500 font-medium">{item.views}</span>
                <div className="flex items-center gap-1 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  AI Conf: {item.confidence}%
                </div>
              </div>
            </div>

            {/* Right Indicator */}
            <div className="shrink-0 flex flex-col items-end">
              <div className="flex items-center gap-1 text-[15px] font-bold text-emerald-600">
                <span>↑</span> {item.forecast.replace('+', '')}
              </div>
              <div className="w-16 h-1 mt-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.confidence}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
