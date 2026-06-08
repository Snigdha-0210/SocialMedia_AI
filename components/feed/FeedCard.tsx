import { motion } from "framer-motion";
import { Info, TrendingUp, ThumbsUp, MessageCircle, Share2, Eye, Play, Camera as CameraIcon } from "lucide-react";
import { FeedPost } from "@/types";
import { useState } from "react";

import { useRouter } from "next/navigation";

interface FeedCardProps {
  post: FeedPost;
  index: number;
  rank?: number;
}

export default function FeedCard({ post, index, rank }: FeedCardProps) {
  const router = useRouter();
  const [expandedReason, setExpandedReason] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState(false);

  const mockViews = Math.round((post.engagement || 0.05) * 100000).toLocaleString();
  const platform = (post as any).platform || "Instagram Reels";
  
  let sourceUrl = (post as any).exactUrl;
  if (!sourceUrl) {
    sourceUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(post.topic)}+shorts`;
  }

  const handleSourceClick = () => {
    window.open(sourceUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      style={{
        padding: 24,
        borderRadius: 24,
        background: "#FFFFFF",
        border: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        height: "100%", // Ensures consistent sizing in grid
      }}
    >
      {/* 1. TREND INSIGHT BOX */}
      <div style={{ padding: 16, background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 16, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Info size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <strong style={{ fontSize: 14, color: "#111827", display: "block", marginBottom: 2 }}>Why am I seeing this?</strong>
          <div style={{ 
            fontSize: 13, 
            color: "var(--text-secondary)", 
            lineHeight: 1.6,
            display: expandedReason ? "block" : "-webkit-box",
            WebkitLineClamp: expandedReason ? "unset" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {post.aiExplanation || "This content is trending globally because of high recent engagement."}
          </div>
          {!expandedReason && (post.aiExplanation?.length || 0) > 120 && (
            <button onClick={() => setExpandedReason(true)} style={{ background: "none", border: "none", color: "#4F46E5", fontSize: 13, fontWeight: 600, padding: 0, marginTop: 4, cursor: "pointer" }}>
              Show More
            </button>
          )}
        </div>
      </div>

      {/* 2. TITLE */}
      <h3 style={{ 
        fontSize: 20, 
        fontWeight: 700, 
        color: "#111827", 
        lineHeight: 1.3,
        margin: 0,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      }}>
        {post.topic}
      </h3>

      {/* 3. CREATOR SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
          {rank && (
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F3F4F6", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#374151", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
              #{rank}
            </div>
          )}
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
            {post.creator?.name?.charAt(0) || "C"}
          </div>
          <div style={{ minWidth: 0, flex: 1, paddingRight: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {post.creator?.name || "Unknown Creator"}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {post.createdAt || "Just now"}
            </div>
          </div>
        </div>

        {/* 4. VIRALITY SCORE */}
        <div style={{ height: 36, padding: "0 12px", background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 999, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#4F46E5" }}>{post.viralityScore}</span>
        </div>
      </div>

      {/* 5. DESCRIPTION */}
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontSize: 15, 
          color: "#374151", 
          lineHeight: 1.7,
          display: expandedDesc ? "block" : "-webkit-box",
          WebkitLineClamp: expandedDesc ? "unset" : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          whiteSpace: "pre-wrap"
        }}>
          {post.content}
        </div>
        {!expandedDesc && (post.content?.length || 0) > 150 && (
          <button onClick={() => setExpandedDesc(true)} style={{ background: "none", border: "none", color: "#4F46E5", fontSize: 14, fontWeight: 600, padding: 0, marginTop: 4, cursor: "pointer" }}>
            Read More
          </button>
        )}
      </div>

      {/* 6. SOURCE SECTION */}
      <button 
        onClick={handleSourceClick}
        style={{
          width: "100%",
          height: 40,
          borderRadius: 12,
          background: "#F3F4F6",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#374151",
          cursor: "pointer",
          transition: "background 0.2s ease"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "#E5E7EB"}
        onMouseOut={(e) => e.currentTarget.style.background = "#F3F4F6"}
      >
        {platform === "YouTube Shorts" ? (
          <><Play size={16} color="#DC2626" /> Open YouTube Short</>
        ) : (
          <><CameraIcon size={16} color="#DB2777" /> Open Instagram Reel</>
        )}
      </button>

      {/* 7. ENGAGEMENT METRICS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
          <ThumbsUp size={16} /> {Math.round(post.engagement * 1000).toLocaleString()}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
          <MessageCircle size={16} /> {Math.round(post.engagement * 100).toLocaleString()}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
          <Share2 size={16} /> {Math.round(post.engagement * 50).toLocaleString()}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
          <Eye size={16} /> {mockViews}
        </div>
      </div>

      {/* 8. ACTION BUTTONS */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => router.push(`/analyze?topic=${encodeURIComponent(post.topic)}&platform=${encodeURIComponent(platform)}`)}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 14,
            background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Analyze
        </button>
        <button
          onClick={() => router.push(`/create?topic=${encodeURIComponent(post.topic)}`)}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 14,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            color: "#374151",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          }}
        >
          Create Post
        </button>
      </div>
    </motion.div>
  );
}
