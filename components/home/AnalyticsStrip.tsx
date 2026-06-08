"use client";

import { Activity, TrendingUp, Users, Target } from "lucide-react";

export default function AnalyticsStrip() {
  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm flex items-center" style={{ borderRadius: 20 }}>
      
      {/* Metric 1 */}
      <div className="flex-1 p-5 border-r border-gray-100 flex items-center gap-4">
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F0FDF4", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#10B981" }}>
          <Activity size={18} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 2 }}>Feed Health</div>
          <div className="flex items-end gap-2">
            <span style={{ fontSize: 24, fontWeight: 800, color: "#111827", lineHeight: 1 }}>98</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981", marginBottom: 2 }}>Excellent</span>
          </div>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="flex-1 p-5 border-r border-gray-100 flex items-center gap-4">
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#EEF2FF", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#4F46E5" }}>
          <TrendingUp size={18} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 2 }}>Growth</div>
          <div className="flex items-end gap-2">
            <span style={{ fontSize: 24, fontWeight: 800, color: "#111827", lineHeight: 1 }}>+27%</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#4F46E5", marginBottom: 2 }}>Top 3%</span>
          </div>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="flex-1 p-5 border-r border-gray-100 flex items-center gap-4">
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFFBEB", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#D97706" }}>
          <Users size={18} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 2 }}>Audience Match</div>
          <div className="flex items-end gap-2">
            <span style={{ fontSize: 24, fontWeight: 800, color: "#111827", lineHeight: 1 }}>91%</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#D97706", marginBottom: 2 }}>High</span>
          </div>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="flex-1 p-5 flex items-center gap-4">
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F3F4F6", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#374151" }}>
          <Target size={18} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 2 }}>Predicted Reach</div>
          <div className="flex items-end gap-2">
            <span style={{ fontSize: 24, fontWeight: 800, color: "#111827", lineHeight: 1 }}>125K</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 2 }}>Expected</span>
          </div>
        </div>
      </div>

    </div>
  );
}
