import { Video, PlaySquare, Briefcase, Users, Search, Calendar, Image as ImageIcon, BarChart3, Zap } from "lucide-react";

export default function QuickActionGrid() {
  const actions = [
    { label: "Generate Reel", icon: Video, color: "text-rose-500", bg: "bg-rose-50 border-rose-100" },
    { label: "Create YouTube Short", icon: PlaySquare, color: "text-red-500", bg: "bg-red-50 border-red-100" },
    { label: "Create LinkedIn Post", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    { label: "Analyze Audience", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" },
    { label: "Find Similar Creators", icon: Search, color: "text-indigo-500", bg: "bg-indigo-50 border-indigo-100" },
    { label: "Schedule Content", icon: Calendar, color: "text-violet-500", bg: "bg-violet-50 border-violet-100" },
    { label: "Generate Thumbnail", icon: ImageIcon, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
    { label: "Competitor Analysis", icon: BarChart3, color: "text-slate-700", bg: "bg-slate-100 border-slate-200" }
  ];

  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-indigo-500" /> Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button key={i} className="group flex flex-col items-center justify-center p-4 bg-white border border-slate-200/60 rounded-xl hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border mb-3 ${action.bg} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <span className="text-xs font-medium text-slate-600 text-center leading-tight group-hover:text-slate-900 transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


