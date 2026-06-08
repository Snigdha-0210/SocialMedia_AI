"use client";

import { useMemo } from "react";
import { LayoutGrid } from "lucide-react";

const CATEGORIES = ["AI Tools", "Finance", "Tech", "Fitness", "Gaming", "Startups"];
const COLUMNS = ["Views", "Growth", "Engagement", "Competition", "Virality"];

export default function CategoryHeatmap() {
  const heatmapData = useMemo(() => {
    return [
      [92, 88, 75, 45, 95],
      [76, 59, 82, 68, 71],
      [57, 77, 64, 52, 84],
      [72, 35, 91, 38, 62],
      [21, 67, 48, 72, 45],
      [44, 85, 56, 29, 88],
    ];
  }, []);

  const getColor = (value: number, colName: string) => {
    // Competition: lower is better (green), higher is worse (red)
    if (colName === "Competition") {
      if (value > 70) return "bg-rose-500 text-white shadow-sm";
      if (value > 50) return "bg-rose-300 text-rose-900";
      if (value > 30) return "bg-amber-200 text-amber-900";
      return "bg-emerald-400 text-white shadow-sm";
    }
    
    // Default gradient (indigo)
    if (value > 85) return "bg-indigo-600 text-white shadow-sm";
    if (value > 65) return "bg-indigo-400 text-white";
    if (value > 45) return "bg-indigo-200 text-indigo-900";
    return "bg-indigo-50 text-indigo-600";
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
        <LayoutGrid className="w-4 h-4 text-indigo-500" />
        <h3 className="font-semibold text-slate-900 text-[16px]">Category Heatmap</h3>
      </div>

      <div className="p-5 flex-1 overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Header */}
          <div className="grid grid-cols-6 gap-2 mb-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1"></div>
            {COLUMNS.map((col) => (
              <div key={col} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">{col}</div>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {CATEGORIES.map((cat, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-6 gap-2 items-center">
                <div className="text-[13px] font-semibold text-slate-700 px-1 truncate">{cat}</div>
                {heatmapData[rowIdx].map((val, colIdx) => (
                  <div
                    key={colIdx}
                    className={`h-10 rounded-[8px] flex items-center justify-center text-[12px] font-bold tabular-nums transition-transform hover:scale-105 cursor-default ${getColor(val, COLUMNS[colIdx])}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
