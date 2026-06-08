"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function CommandCenter() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm flex overflow-hidden" style={{ borderRadius: 20, height: 280, backgroundColor: "#FFFFFF" }}>
      
      {/* Left 70% */}
      <div className="flex-[0.7] p-8 flex flex-col justify-between border-r border-gray-100">
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.1 }}>
            Good Morning Alex 👋
          </h1>
          <p style={{ fontSize: 15, color: "#6B7280" }}>
            Your creator engine has identified <strong className="text-gray-900">12 viral opportunities</strong> today.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <motion.div whileHover={{ scale: 1.01, x: 4 }} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔥</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>OpenAI Agent Content</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>Opportunity Score 94%</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01, x: 4 }} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">📈</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>AI Startup Funding</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>Opportunity Score 89%</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01, x: 4 }} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🚀</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Creator Monetization</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>Opportunity Score 86%</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </motion.div>
        </div>
      </div>

      {/* Right 30% */}
      <div className="flex-[0.3] flex flex-col items-center justify-center p-8 relative bg-gray-50/50">
        <div style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 24 }}>
          Creator Intelligence Score
        </div>
        
        {/* Animated Ring */}
        <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#F3F4F6" strokeWidth="8" />
            <motion.circle 
              cx="70" cy="70" r="60" fill="none" stroke="#4F46E5" strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray="377"
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 377 * 0.08 }} // 92% complete (100-92=8%)
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span style={{ fontSize: 42, fontWeight: 800, color: "#111827", lineHeight: 1 }}>92</span>
          </div>
        </div>
      </div>

    </div>
  );
}
