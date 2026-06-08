"use client";

import { TrendingUp, BarChart2, Sparkles, Play } from "lucide-react";

const HOTTEST = [
  { title: "Midjourney v6 Prompt Secrets", category: "AI Art", views: "6.8M", velocity: "+18K/hr", score: 95, ytId: "dQw4w9WgXcQ" },
  { title: "5 Min Abs No Equipment", category: "Fitness", views: "1.2M", velocity: "+8K/hr", score: 88, ytId: "dQw4w9WgXcQ" },
  { title: "React 19 Features Explained", category: "Programming", views: "2.1M", velocity: "+15K/hr", score: 91, ytId: "dQw4w9WgXcQ" },
  { title: "Budget Travel Japan 2026", category: "Travel", views: "5.1M", velocity: "+5K/hr", score: 82, ytId: "dQw4w9WgXcQ" },
];

export default function HottestReelsGrid() {
  return (
    <section>
      <h2 className="text-[20px] font-semibold tracking-tight text-slate-900 mb-6 flex items-center gap-2">
        🔥 Hottest Reels Right Now
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOTTEST.map((card, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-indigo-200 transition-all duration-300 flex flex-col p-5 group">
            {/* Header Badges */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-[6px] shadow-sm">
                {card.category}
              </span>
              <span className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold tabular-nums shadow-sm border ${
                card.score >= 90 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"
              }`}>
                Score {card.score}
              </span>
            </div>

            {/* Content Body */}
            <div className="flex-1 flex flex-col">
              <a
                href={`https://youtube.com/shorts/${card.ytId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-slate-900 text-[16px] leading-snug hover:text-indigo-600 transition-colors mb-6 line-clamp-2"
              >
                {card.title}
              </a>

              {/* Stats */}
              <div className="mt-auto grid grid-cols-2 gap-4 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Views</div>
                  <div className="text-[15px] font-bold text-slate-900 tabular-nums">{card.views}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Velocity</div>
                  <div className="text-[15px] font-bold text-emerald-600 tabular-nums flex items-center justify-end gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />{card.velocity}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a
                  href={`/analyze?id=${card.ytId}`}
                  className="py-2 text-[12px] font-semibold bg-slate-50 border border-[#E5E7EB] hover:bg-slate-100 text-slate-700 rounded-[8px] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <BarChart2 className="w-3.5 h-3.5" /> Analyze
                </a>
                <a
                  href={`/create?topic=${encodeURIComponent(card.title)}`}
                  className="py-2 text-[12px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-[8px] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Create
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
