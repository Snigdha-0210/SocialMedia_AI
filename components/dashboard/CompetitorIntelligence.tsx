"use client";

import { Users, BarChart2, TrendingUp, Sparkles } from "lucide-react";

const COMPETITORS = [
  { name: "Marques Brownlee", niche: "Tech", growth: "+14%", avgViews: "5.2M", viral: "Apple Vision Pro Review", avatar: "MB", ytId: "dQw4w9WgXcQ" },
  { name: "Ali Abdaal", niche: "Productivity", growth: "+8%", avgViews: "1.8M", viral: "How I Make $5M a Year", avatar: "AA", ytId: "dQw4w9WgXcQ" },
  { name: "MrWhoseTheBoss", niche: "Tech", growth: "+11%", avgViews: "6.1M", viral: "Fake vs Real iPhone", avatar: "MW", ytId: "dQw4w9WgXcQ" },
  { name: "Alex Hormozi", niche: "Business", growth: "+21%", avgViews: "890K", viral: "Stop doing this to get rich", avatar: "AH", ytId: "dQw4w9WgXcQ" },
];

export default function CompetitorIntelligence() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
        <Users className="w-4 h-4 text-indigo-500" />
        <h3 className="font-semibold text-slate-900 text-[16px]">Competitor Intelligence</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-[#E5E7EB]/50">
          {COMPETITORS.map((comp, i) => (
            <div key={i} className="px-5 py-4 hover:bg-slate-50 transition-colors group flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold text-[13px] shrink-0 shadow-sm border border-slate-700">
                    {comp.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-slate-900">{comp.name}</h4>
                    <p className="text-[12px] text-slate-500 font-medium">{comp.niche} • {comp.avgViews} avg</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-[6px]">
                  <TrendingUp className="w-3 h-3" /> {comp.growth}
                </span>
              </div>

              <div className="bg-slate-100/50 rounded-[8px] p-2.5 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Viral</span>
                  <a
                    href={`https://youtube.com/shorts/${comp.ytId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline truncate ml-2"
                  >
                    {comp.viral}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                <button className="py-2 bg-white border border-[#E5E7EB] text-slate-700 hover:bg-slate-50 text-[12px] font-semibold rounded-[8px] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  <BarChart2 className="w-3.5 h-3.5" /> Analyze
                </button>
                <button className="py-2 bg-indigo-600 text-white text-[12px] hover:bg-indigo-700 font-semibold rounded-[8px] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Follow Trend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
