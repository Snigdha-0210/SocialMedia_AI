"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, Target, Zap, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AIActivityFeed from "@/components/home/AIActivityFeed";

const ACTION_CARDS = [
  { icon: Zap, title: "Generate Content", desc: "AI scripts & hooks", href: "/create", color: "#4F46E5" },
  { icon: TrendingUp, title: "Discover Trends", desc: "Live viral signals", href: "/feed", color: "#06B6D4" },
  { icon: Users, title: "Analyze Audience", desc: "Deep demographics", href: "/analyze", color: "#10B981" },
  { icon: Target, title: "Viral Opportunities", desc: "High-probability topics", href: "/feed", color: "#F59E0B" }
];

export default function DashboardHero() {
  return (
    <div className="w-full flex flex-col gap-8 mb-8">
      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT PANEL: AI Command Center (60%) */}
        <div className="flex-[0.6] flex flex-col gap-8">
          
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, color: "#111827", marginBottom: 16, letterSpacing: "-0.02em" }}
            >
              Creator Intelligence OS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: 18, fontWeight: 400, color: "#6B7280", maxWidth: 540, marginBottom: 24, lineHeight: 1.6 }}
            >
              AI-powered trend discovery, audience prediction, content generation, and growth optimization.
            </motion.p>

            {/* Live AI Status Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Trend Engine Online
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "200ms" }} />
                Audience Model Active
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "400ms" }} />
                Prediction Engine Running
              </div>
            </motion.div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACTION_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link key={i} href={card.href} className="block">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-5 bg-white border border-gray-200 rounded-2xl flex items-start gap-4 shadow-sm"
                    style={{ transition: "box-shadow 0.2s" }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${card.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={card.color} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{card.title}</h3>
                      <p style={{ fontSize: 13, color: "#6B7280" }}>{card.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Live AI Insights (40%) */}
        <div className="flex-[0.4] bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <Activity size={16} className="text-accent" /> Live AI Insights
            </h2>
            <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
            </div>
          </div>

          {/* Metrics Widget */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Opportunity Score</div>
              <div className="text-2xl font-extrabold text-gray-900">92%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Audience Match</div>
              <div className="text-2xl font-extrabold text-gray-900">88%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Predicted Reach</div>
              <div className="text-2xl font-extrabold text-blue-600">125K</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Growth Momentum</div>
              <div className="text-2xl font-extrabold text-green-600">+31%</div>
            </div>
          </div>

          {/* AI Activity Feed Inline */}
          <div className="mt-auto">
            <AIActivityFeed />
          </div>
        </div>

      </div>
    </div>
  );
}
