"use client";

import { Search, Bell, Moon, User } from "lucide-react";

export default function TopNav() {
  return (
    <div className="sticky top-0 z-50 w-full h-[72px] bg-white/90 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 shadow-sm font-sans">
      <div className="flex items-center gap-8 flex-1">
        <h1 className="font-semibold text-lg tracking-tight text-slate-900">CREATOR OS</h1>
        <div className="relative max-w-xl w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search trends, creators, categories, opportunities..." 
            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full pl-10 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Agent Status Pill */}
        <div className="hidden lg:flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 cursor-default">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>AI Agent Ready</span>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white" />
        </button>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        <div className="ml-1 h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer shadow-sm hover:shadow transition-shadow">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
