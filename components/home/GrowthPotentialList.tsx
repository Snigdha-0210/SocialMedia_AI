"use client";

import { useEffect, useState } from "react";
import { Zap, TrendingUp, BarChart2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GrowthPotentialList() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch(`/api/feed/ranked?niche=AI&location=Global&_t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          // Sort by a mock growth metric or just take top 5
          setOpportunities(data.posts?.slice(0, 5) || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-sm flex flex-col" style={{ borderRadius: 20 }}>
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", display: "flex", alignItems: "center", gap: 8 }}>
          <TrendingUp className="text-green-600" size={20} /> Highest Growth Potential
        </h2>
        <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full" style={{ fontSize: 12, fontWeight: 700 }}>Top 5</div>
      </div>
      
      <div className="flex flex-col flex-1 p-2 relative min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {opportunities.map((opp, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669", fontWeight: 800, fontSize: 14 }}>
                <TrendingUp size={18} />
              </div>
              <div className="flex-1">
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 2 }} className="line-clamp-1">{opp.title}</div>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                    <span className="text-green-600">Breakout Trend</span>
                  </span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>•</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{opp.platform || "Multi-Platform"}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Link href={`/analyze?topic=${encodeURIComponent(opp.title)}&platform=${encodeURIComponent(opp.platform || 'General')}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors shadow-sm">
                <BarChart2 size={16} /> Analyze
              </Link>
              <Link href={`/create?topic=${encodeURIComponent(opp.title)}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-sm font-bold transition-colors shadow-sm">
                <Zap size={16} /> Create
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
