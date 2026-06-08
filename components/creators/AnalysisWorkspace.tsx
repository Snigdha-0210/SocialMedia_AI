import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Zap, Play, CheckCircle, BarChart3, Users } from "lucide-react";

interface AnalysisWorkspaceProps {
  creator: any | null;
  analysisData: any | null;
  isLoading: boolean;
  onClose: () => void;
}

export default function AnalysisWorkspace({ creator, analysisData, isLoading, onClose }: AnalysisWorkspaceProps) {
  if (!creator) return null;

  return (
    <AnimatePresence>
      {creator && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(17, 24, 39, 0.4)",
              backdropFilter: "blur(4px)",
              zIndex: 999
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
              background: "#FAFBFC",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <div style={{ padding: "24px 32px", background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src={creator.avatar} alt={creator.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#111827" }}>{creator.name}</h2>
                  <div style={{ fontSize: 13, color: "#6B7280" }}>{creator.category} • AI Intelligence Report</div>
                </div>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}>
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ height: 200, background: "#F3F4F6", borderRadius: 16, animation: "pulse 2s infinite" }} />
                  <div style={{ height: 300, background: "#F3F4F6", borderRadius: 16, animation: "pulse 2s infinite" }} />
                  <div style={{ height: 150, background: "#F3F4F6", borderRadius: 16, animation: "pulse 2s infinite" }} />
                </div>
              ) : analysisData ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  
                  {/* Success Analysis */}
                  <div style={{ background: "#FFFFFF", padding: 24, borderRadius: 20, border: "1px solid #E5E7EB", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <Target size={20} color="#4F46E5" />
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Success Analysis</h3>
                    </div>
                    <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.6, margin: 0 }}>
                      {analysisData.successAnalysis}
                    </p>
                  </div>

                  {/* AI Blueprint */}
                  <div style={{ background: "linear-gradient(135deg, #111827 0%, #374151 100%)", padding: 24, borderRadius: 20, color: "#FFFFFF" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                      <Zap size={20} color="#FBBF24" />
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>AI Success Blueprint</h3>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>Hook Formula</div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{analysisData.successBlueprint?.hookFormula}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>Retention Strategy</div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{analysisData.successBlueprint?.retentionStrategy}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>Pillars</div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{analysisData.successBlueprint?.contentPillars?.join(", ")}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>Upload Frequency</div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{analysisData.successBlueprint?.uploadFrequency}</div>
                      </div>
                    </div>
                  </div>

                  {/* Top Viral Videos */}
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <Play size={20} color="#EF4444" /> Viral Video Breakdowns
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {analysisData.viralVideoAnalysis?.map((vid: any, i: number) => (
                        <div key={i} style={{ background: "#FFFFFF", padding: 16, borderRadius: 16, border: "1px solid #E5E7EB" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{vid.title}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#D1FAE5", padding: "2px 8px", borderRadius: 999 }}>{vid.views}</div>
                          </div>
                          <div style={{ fontSize: 13, color: "#6B7280" }}>{vid.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth Trajectory (NEW) */}
                  {analysisData.growthTrajectory && (
                    <div style={{ background: "#F0FDF4", padding: 24, borderRadius: 20, border: "1px solid #BBF7D0" }}>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#166534", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                        <BarChart3 size={20} /> Growth Trajectory
                      </h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 12, color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>Current Phase</div>
                          <div style={{ fontSize: 14, color: "#14532D", marginTop: 4, fontWeight: 500 }}>{analysisData.growthTrajectory.currentPhase}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 12, color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>Projected Future</div>
                          <div style={{ fontSize: 14, color: "#14532D", marginTop: 4, fontWeight: 500 }}>{analysisData.growthTrajectory.projectedFuture}</div>
                        </div>
                        <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
                          <div style={{ fontSize: 12, color: "#166534", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Growth Catalysts</div>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {analysisData.growthTrajectory.growthCatalysts?.map((cat: string, i: number) => (
                              <span key={i} style={{ background: "#DCFCE7", color: "#166534", padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 500, border: "1px solid #BBF7D0" }}>
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Monetization Strategy (NEW) */}
                  {analysisData.monetizationStrategy && (
                    <div style={{ background: "#FFFBEB", padding: 24, borderRadius: 20, border: "1px solid #FDE68A" }}>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#92400E", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 20 }}>💰</span> Monetization Strategy
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10, color: "#78350F" }}>
                        {analysisData.monetizationStrategy.map((strat: string, i: number) => (
                          <li key={i} style={{ fontSize: 14, fontWeight: 500 }}>{strat}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* AI Learning Lessons */}
                  <div style={{ background: "#EEF2FF", padding: 24, borderRadius: 20, border: "1px solid #C7D2FE" }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#4F46E5", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle size={20} /> Actionable Takeaways
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12, color: "#374151" }}>
                      {analysisData.aiLearning?.map((lesson: string, i: number) => (
                        <li key={i} style={{ fontSize: 14, lineHeight: 1.5 }}>{lesson}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Similar Creators */}
                  {analysisData.similarCreators && analysisData.similarCreators.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                        <Users size={20} color="#8B5CF6" /> Creators Like This
                      </h3>
                      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                        {analysisData.similarCreators.map((sim: any, i: number) => (
                          <div key={i} style={{ background: "#FFFFFF", padding: "12px 16px", borderRadius: 12, border: "1px solid #E5E7EB", minWidth: 160 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{sim.name}</div>
                            <div style={{ fontSize: 12, color: "#6B7280" }}>{sim.similarityScore}% Match</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#6B7280", marginTop: 40 }}>Failed to load analysis.</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
