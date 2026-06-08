import { motion } from "framer-motion";
import { ExternalLink, BarChart2, CheckCircle2 } from "lucide-react";

interface CreatorCardProps {
  creator: any;
  onAnalyze: (creator: any) => void;
  index: number;
}

export default function CreatorCard({ creator, onAnalyze, index }: CreatorCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleVisit = () => {
    window.open(creator.url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        border: "1px solid #E5E7EB",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        transition: "border-color 0.2s ease"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <img 
              src={creator.avatar || "https://via.placeholder.com/64"} 
              alt={creator.name} 
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(creator.name)}&backgroundColor=e2e8f0&textColor=475569`;
              }}
              style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "2px solid #F3F4F6", background: "#f8fafc" }}
            />
            {creator.subscribers > 100000 && (
              <div style={{ position: "absolute", bottom: -2, right: -2, background: "#FFF", borderRadius: "50%", padding: 2 }}>
                <CheckCircle2 size={16} color="#3B82F6" fill="#DBEAFE" />
              </div>
            )}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 6 }}>
              {creator.name}
            </h3>
            <span style={{ fontSize: 13, color: "#6B7280", background: "#F3F4F6", padding: "2px 8px", borderRadius: 12, marginTop: 4, display: "inline-block" }}>
              {creator.category}
            </span>
          </div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#F8FAFC", padding: "8px 12px", borderRadius: 12, border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#4F46E5", lineHeight: 1 }}>{creator.score}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#64748B", textTransform: "uppercase", marginTop: 2 }}>Score</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24, padding: "16px 0", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
        <div>
          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>Subscribers</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{formatNumber(creator.subscribers)}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>Avg Views</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{formatNumber(creator.avgViews)}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>Growth Rate</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: creator.growthRate === "Explosive" ? "#10B981" : "#F59E0B" }}>
            {creator.growthRate}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>Uploads</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{creator.uploadFrequency}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
        <button
          onClick={handleVisit}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 0",
            background: "#F3F4F6",
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            color: "#374151",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#E5E7EB"}
          onMouseOut={(e) => e.currentTarget.style.background = "#F3F4F6"}
        >
          <ExternalLink size={16} /> Channel
        </button>
        <button
          onClick={() => onAnalyze(creator)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 0",
            background: "#111827",
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#374151"}
          onMouseOut={(e) => e.currentTarget.style.background = "#111827"}
        >
          <BarChart2 size={16} /> Analyze
        </button>
      </div>
    </motion.div>
  );
}
