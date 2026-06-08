"use client";

import { useEffect, useState } from "react";
import { ExternalLink, BarChart2, Zap, TrendingUp, Hash } from "lucide-react";
import Link from "next/link";
import { FeedPost } from "@/types";

export default function GlobalTrendsTable() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch(`/api/feed/ranked?niche=AI&location=Global&_t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts?.slice(0, 8) || []); // Top 8 global
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
          <Hash className="text-blue-600" size={20} /> Global Top Trending Topics
        </h2>
      </div>

      <div className="overflow-x-auto relative min-h-[200px]">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Topic</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Growth</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={post.id || idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-6">
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: idx < 3 ? "#EEF2FF" : "#F3F4F6", color: idx < 3 ? "#4F46E5" : "#6B7280", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>
                    #{idx + 1}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", maxWidth: 300 }} className="truncate">
                    {post.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{post.platform}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                    {post.topic || "AI Content"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1 text-green-600 font-bold text-sm">
                    <TrendingUp size={14} /> +{Math.floor(Math.random() * 80) + 20}%
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {post.sourceUrl && (
                      <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" 
                         className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Source">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link href={`/analyze?topic=${encodeURIComponent(post.title)}&platform=${encodeURIComponent(post.platform || 'General')}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-bold transition-colors">
                      <BarChart2 size={14} /> Analyze
                    </Link>
                    <Link href={`/create?topic=${encodeURIComponent(post.title)}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-xs font-bold transition-colors">
                      <Zap size={14} /> Create
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500 text-sm">No global trends found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
