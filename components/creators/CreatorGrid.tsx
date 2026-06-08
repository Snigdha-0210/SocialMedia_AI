import CreatorCard from "./CreatorCard";

interface CreatorGridProps {
  creators: any[];
  isLoading: boolean;
  onAnalyze: (creator: any) => void;
}

export default function CreatorGrid({ creators, isLoading, onAnalyze }: CreatorGridProps) {
  if (isLoading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ 
            height: 280, 
            background: "#F9FAFB", 
            borderRadius: 20, 
            border: "1px solid #E5E7EB",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }} />
        ))}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", background: "#FFFFFF", borderRadius: 20, border: "1px dashed #E5E7EB" }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#374151", marginBottom: 8 }}>No creators found</h3>
        <p style={{ color: "#6B7280" }}>Try a different search term or select another niche.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
      {creators.map((creator, idx) => (
        <CreatorCard 
          key={creator.id} 
          creator={creator} 
          index={idx} 
          onAnalyze={onAnalyze} 
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}} />
    </div>
  );
}
