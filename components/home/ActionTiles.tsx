"use client";

import { motion } from "framer-motion";
import { Zap, Share, PieChart, Users, Calendar } from "lucide-react";
import Link from "next/link";

const ACTIONS = [
  { icon: Zap, title: "Generate Reel", desc: "Turn trend into script", color: "#4F46E5", href: "/create" },
  { icon: Share, title: "Create LinkedIn Post", desc: "AI thought leadership", color: "#06B6D4", href: "/create" },
  { icon: PieChart, title: "Analyze Audience", desc: "View demographic breakdown", color: "#10B981", href: "/analyze" },
  { icon: Users, title: "Find Similar Creators", desc: "Discover collab opportunities", color: "#F59E0B", href: "/creators" },
  { icon: Calendar, title: "Schedule Content", desc: "Queue your generated posts", color: "#8B5CF6", href: "/calendar" }
];

export default function ActionTiles() {
  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>Recommended Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <Link key={i} href={action.href} className="block">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white border border-gray-200 shadow-sm flex flex-col p-6 h-full"
                style={{ borderRadius: 20, transition: "box-shadow 0.2s", minHeight: 140 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${action.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon size={18} color={action.color} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{action.title}</div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>{action.desc}</div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
