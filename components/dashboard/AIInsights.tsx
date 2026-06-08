"use client";

import { BrainCircuit, Sparkles, ChevronRight, BarChart2 } from "lucide-react";

const INSIGHTS = [
  { title: "AI Animation Cat Videos growing 91% this week", confidence: 98, score: 95 },
  { title: "Short educational reels under 30s outperforming by 63%", confidence: 92, score: 88 },
  { title: "AI productivity content has lowest competition right now", confidence: 87, score: 91 },
];

export default function AIInsights() {
  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[16px] shadow-lg flex flex-col h-full overflow-hidden border border-slate-800/50">
      <div className="p-5 border-b border-white/10">
        <h3 className="font-semibold text-white text-[16px] tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-indigo-400" /> AI Opportunity Insights
        </h3>
        <p className="text-[13px] text-slate-400 mt-1">Real-time content gaps and viral patterns</p>
      </div>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {INSIGHTS.map((insight, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/10 rounded-[12px] p-4 hover:bg-white/[0.08] transition-colors group">
            <p className="text-[14px] font-medium text-slate-200 leading-snug mb-3">
              {insight.title}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider">
                Conf: {insight.confidence}%
              </span>
              <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-[10px] font-bold uppercase tracking-wider">
                Score: {insight.score}
              </span>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[12px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" /> Analyze
              </button>
              <button className="flex-1 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-[12px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Create
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full py-2.5 rounded-[10px] bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[13px] font-semibold transition-colors flex items-center justify-center gap-1.5">
          View All Insights <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
