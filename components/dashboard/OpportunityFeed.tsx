"use client";

import { Activity, Zap, TrendingUp, Users, ArrowRight } from "lucide-react";

const EVENTS = [
  { time: "09:14 AM", text: "Viral prediction updated for AI Art category", type: "system", icon: Activity, color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" },
  { time: "09:09 AM", text: "Competitor 'TechGuru' uploaded viral content", type: "competitor", icon: Users, color: "text-rose-500", bg: "bg-rose-100", border: "border-rose-200" },
  { time: "09:05 AM", text: "New micro-category emerging: AI Coding Tools", type: "insight", icon: Zap, color: "text-amber-500", bg: "bg-amber-100", border: "border-amber-200" },
  { time: "09:01 AM", text: "Trend spike detected in SaaS Marketing", type: "trend", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-100", border: "border-emerald-200" },
];

export default function OpportunityFeed() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 text-[16px]">Activity Feed</h3>
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="p-5 flex-1 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-slate-100 rounded-full" />

        <div className="space-y-6 relative z-10">
          {EVENTS.map((event, i) => {
            const Icon = event.icon;
            return (
              <div key={i} className="flex gap-4 group">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm ${event.bg} ${event.border}`}>
                  <Icon className={`w-4 h-4 ${event.color}`} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{event.type}</span>
                    <time className="text-[11px] text-slate-400 font-medium">{event.time}</time>
                  </div>
                  <p className="text-[14px] font-medium text-slate-800 leading-snug mb-2">{event.text}</p>
                  <button className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
