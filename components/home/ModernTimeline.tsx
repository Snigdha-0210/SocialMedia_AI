"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Users, BarChart } from "lucide-react";

const EVENTS = [
  { time: "09:01", icon: Activity, color: "#4F46E5", text: "Detected trend spike in AI agents" },
  { time: "09:08", icon: Users, color: "#10B981", text: "Audience profile updated" },
  { time: "09:12", icon: Cpu, color: "#F59E0B", text: "Generated creator recommendations" },
  { time: "09:14", icon: BarChart, color: "#06B6D4", text: "Virality model retrained" },
  { time: "09:15", icon: Activity, color: "#8B5CF6", text: "Ready for content generation" },
];

export default function ModernTimeline() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm flex flex-col" style={{ borderRadius: 20, height: "100%" }}>
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>AI Activity Feed</h2>
        <div className="flex items-center gap-2" style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6 relative">
        <div className="absolute left-[39px] top-8 bottom-8 w-px bg-gray-100" />
        
        {EVENTS.map((evt, i) => {
          const Icon = evt.icon;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 relative z-10"
            >
              <div style={{ width: 44, fontSize: 12, fontWeight: 600, color: "#9CA3AF", paddingTop: 6 }}>
                {evt.time}
              </div>
              <div style={{ 
                width: 32, height: 32, borderRadius: "50%", background: "white", 
                border: `2px solid ${evt.color}`, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                <Icon size={14} color={evt.color} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#374151", paddingTop: 5, lineHeight: 1.4 }}>
                {evt.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
