import { Sparkles, TrendingUp, Users, Activity } from "lucide-react";

export default function HeroWelcome() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full mb-8">
      {/* Left Block */}
      <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm flex flex-col justify-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">Good Morning, Creator</h2>
        <p className="text-slate-500 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Your AI Creator Engine identified <span className="font-semibold text-indigo-600">143</span> high-potential content opportunities today.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Opps</span>
            <span className="text-2xl font-semibold text-slate-800">143</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Viral Prob.</span>
            <span className="text-2xl font-semibold text-emerald-600">87%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Market</span>
            <span className="text-2xl font-semibold text-indigo-600 flex items-center gap-1">High <Activity className="w-4 h-4"/></span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Competitors</span>
            <span className="text-2xl font-semibold text-rose-500 flex items-center gap-1">Active <Users className="w-4 h-4"/></span>
          </div>
        </div>
      </div>

      {/* Right Block */}
      <div className="w-full lg:w-80 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/20 blur-3xl rounded-full" />
        
        <h3 className="text-indigo-200 text-sm font-medium uppercase tracking-wider mb-6 text-center">Creator Intelligence</h3>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="283" strokeDashoffset="22" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-bold tracking-tighter">92</span>
            <span className="text-emerald-400 text-xs font-medium">/ 100</span>
          </div>
        </div>

        <div className="mt-6 w-full flex justify-between text-xs font-medium text-slate-300">
          <span>Prediction Acc: 94%</span>
          <span className="text-slate-400">Just now</span>
        </div>
      </div>
    </div>
  );
}
