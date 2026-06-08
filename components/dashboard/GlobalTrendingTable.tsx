"use client";

import { useState } from "react";
import { TrendingUp, BarChart2, Sparkles, ExternalLink, Play } from "lucide-react";

// Using real YouTube IDs to fetch actual thumbnails
const REEL_DATA = [
  { rank: 1, title: "ChatGPT-4o Advanced Voice Demo", category: "AI Technology", platform: "YouTube Shorts", views: "14.2M", growth: "+145%", score: 98, age: "4h", ytId: "dQw4w9WgXcQ" },
  { rank: 2, title: "10 Minute Home HIIT Workout", category: "Fitness", platform: "Instagram Reels", views: "8.1M", growth: "+92%", score: 89, age: "12h", ytId: "dQw4w9WgXcQ" },
  { rank: 3, title: "How to negotiate your salary", category: "Career", platform: "TikTok", views: "5.5M", growth: "+112%", score: 92, age: "6h", ytId: "dQw4w9WgXcQ" },
  { rank: 4, title: "Secret iPhone Camera Hacks", category: "Tech", platform: "Instagram Reels", views: "11.2M", growth: "+45%", score: 76, age: "24h", ytId: "dQw4w9WgXcQ" },
  { rank: 5, title: "Quick High Protein Breakfast", category: "Cooking", platform: "TikTok", views: "3.4M", growth: "+88%", score: 82, age: "8h", ytId: "dQw4w9WgXcQ" },
];

export default function GlobalTrendingTable() {
  const [showCount, setShowCount] = useState(20);
  const visibleData = REEL_DATA; // Mock limited for brevity

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 80) return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getPlatformBadge = (platform: string) => {
    if (platform.includes("YouTube")) return "bg-red-50 text-red-700 border-red-100";
    if (platform.includes("Instagram")) return "bg-pink-50 text-pink-700 border-pink-100";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-semibold tracking-tight text-slate-900 flex items-center gap-2">
            🌍 Top 20 Trending Reels Worldwide
          </h2>
          <p className="text-[14px] text-slate-500 mt-1">Real-time performance metrics across all platforms</p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-left">
                <th className="px-5 py-4 w-16 text-slate-500 font-semibold text-[12px] uppercase tracking-wider">Rank</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider">Title & Link</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider">Category</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider">Platform</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider text-right">Views</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider text-right">Growth</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider text-center">Virality</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider text-center">Age</th>
                <th className="px-5 py-4 text-slate-500 font-semibold text-[12px] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/50">
              {visibleData.map((row) => (
                <tr key={row.rank} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-4 font-bold text-slate-400 tabular-nums">#{row.rank}</td>

                  <td className="px-5 py-4 max-w-[280px]">
                    <a
                      href={`https://youtube.com/shorts/${row.ytId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors flex flex-col gap-1 truncate"
                    >
                      <span className="truncate">{row.title}</span>
                      <span className="text-[11px] font-medium text-indigo-500 flex items-center gap-1">
                        View exact short <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[11px] font-semibold whitespace-nowrap">{row.category}</span>
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border whitespace-nowrap ${getPlatformBadge(row.platform)}`}>{row.platform}</span>
                  </td>
                  
                  <td className="px-5 py-4 text-right font-semibold text-slate-900 tabular-nums whitespace-nowrap">{row.views}</td>
                  
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center justify-end gap-1 font-semibold text-emerald-600 whitespace-nowrap">
                      <TrendingUp className="w-3 h-3" /> {row.growth}
                    </span>
                  </td>
                  
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] border font-bold tabular-nums ${getScoreBadge(row.score)}`}>
                      {row.score}
                    </span>
                  </td>
                  
                  <td className="px-5 py-4 text-center text-slate-500 text-[12px] whitespace-nowrap font-medium">{row.age}</td>
                  
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={`/analyze?id=${row.ytId}`}
                        className="p-2 bg-white border border-[#E5E7EB] hover:bg-slate-50 text-slate-600 rounded-[8px] transition-colors shadow-sm"
                        title="Analyze"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </a>
                      <a
                        href={`/create?topic=${encodeURIComponent(row.title)}`}
                        className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[8px] transition-colors shadow-sm"
                        title="Create Similar"
                      >
                        <Sparkles className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#E5E7EB] p-4 bg-[#F8FAFC] flex items-center justify-center gap-3">
          {[20, 50, 100].map((count) => (
            <button
              key={count}
              onClick={() => setShowCount(count)}
              className={`px-4 py-2 text-[13px] font-semibold rounded-[8px] transition-colors ${
                showCount === count
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-[#E5E7EB] text-slate-600 hover:bg-slate-50"
              }`}
            >
              Top {count}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
