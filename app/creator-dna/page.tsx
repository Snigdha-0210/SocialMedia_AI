"use client";

import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Sparkles, BrainCircuit } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { CreatorDNA } from "@/types";

export default function CreatorDNAPage() {
  const user = useAppStore(state => state.user);
  const [dna, setDna] = useState<CreatorDNA | null>(null);

  useEffect(() => {
    // In a real app, fetch from Firestore. Mocking for demonstration:
    setDna({
      innovation: 92,
      authority: 87,
      storytelling: 95,
      humor: 60,
      education: 85,
      consistency: 78,
      trendAwareness: 90
    });
  }, []);

  if (!dna) return null;

  const chartData = [
    { subject: "Innovation", A: dna.innovation, fullMark: 100 },
    { subject: "Authority", A: dna.authority, fullMark: 100 },
    { subject: "Storytelling", A: dna.storytelling, fullMark: 100 },
    { subject: "Humor", A: dna.humor, fullMark: 100 },
    { subject: "Education", A: dna.education, fullMark: 100 },
    { subject: "Consistency", A: dna.consistency, fullMark: 100 },
    { subject: "Trend Awareness", A: dna.trendAwareness, fullMark: 100 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      <div className="page-header mb-8">
        <h1 className="page-title flex items-center gap-2">
          <BrainCircuit className="text-accent" size={24} />
          Creator DNA
        </h1>
        <p className="page-subtitle">Your AI-generated psychological and structural content profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="font-bold text-text-primary mb-6">Your Content DNA Signature</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#4B5563", fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="You"
                dataKey="A"
                stroke="#4F46E5"
                strokeWidth={3}
                fill="#4F46E5"
                fillOpacity={0.3}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                itemStyle={{ color: '#4F46E5', fontWeight: 'bold' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-6 bg-gradient-to-br from-accent to-secondary text-white border-none">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-white opacity-80" />
              <h3 className="font-bold text-lg">AI DNA Analysis</h3>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-4">
              Your profile indicates a highly innovative and storytelling-driven approach. You index very high on trend awareness, meaning your content is timely and resonant. Your lower humor score suggests a more professional, authoritative tone.
            </p>
            <div className="text-xs font-semibold bg-white/20 py-2 px-3 rounded-lg inline-block w-fit">
              Archetype: The Visionary Educator
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-text-primary mb-4 text-sm uppercase tracking-wide">Breakdown</h3>
            <div className="flex flex-col gap-4">
              {chartData.sort((a,b) => b.A - a.A).map(item => (
                <div key={item.subject}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-text-secondary">{item.subject}</span>
                    <span className="text-accent">{item.A}</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${item.A}%`, background: 'var(--accent)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
