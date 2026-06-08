import { Activity, Target, TrendingUp, Users, Zap, Award } from "lucide-react";

export default function PremiumAnalytics() {
  const metrics = [
    { label: "Feed Health", value: "98", trend: "+2.4%", isPositive: true, icon: Activity },
    { label: "Audience Match", value: "85%", trend: "+5.1%", isPositive: true, icon: Target },
    { label: "Predicted Reach", value: "2.4M", trend: "+12%", isPositive: true, icon: Users },
    { label: "Content Velocity", value: "14/hr", trend: "-1.2%", isPositive: false, icon: Zap },
    { label: "Virality Index", value: "94", trend: "+8.4%", isPositive: true, icon: Award }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-indigo-50 transition-colors border border-slate-100 group-hover:border-indigo-100">
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${m.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {m.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                {m.trend}
              </div>
            </div>
            <h4 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{m.label}</h4>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-slate-900 tracking-tight">{m.value}</span>
              {/* Mini Sparkline placeholder */}
              <div className="w-16 h-6 flex items-end gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                {[4,7,3,6,8,5,9].map((h, j) => (
                  <div key={j} className={`w-full rounded-t-sm ${m.isPositive ? 'bg-emerald-400' : 'bg-rose-400'}`} style={{ height: `${h * 10}%` }} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
