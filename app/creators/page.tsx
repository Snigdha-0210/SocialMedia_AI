"use client";

import { useState, useEffect } from "react";
import DiscoveryHeader from "@/components/creators/DiscoveryHeader";
import CreatorGrid from "@/components/creators/CreatorGrid";
import AnalysisWorkspace from "@/components/creators/AnalysisWorkspace";
import { motion } from "framer-motion";

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("AI");
  const [creators, setCreators] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Analysis State
  const [analyzingCreator, setAnalyzingCreator] = useState<any | null>(null);
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [selectedNiche]);

  const handleSearch = async () => {
    setIsSearching(true);
    setError(null);
    try {
      const q = searchQuery.trim() || selectedNiche;
      const res = await fetch(`/api/creators/search?query=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Failed to fetch creators");
      const data = await res.json();
      setCreators(data.creators || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAnalyze = async (creator: any) => {
    setAnalyzingCreator(creator);
    setIsAnalyzing(true);
    setAnalysisData(null);
    try {
      const res = await fetch("/api/creators/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Analysis failed");
      }
      const data = await res.json();
      setAnalysisData(data.analysis);
    } catch (err: any) {
      console.error(err);
      setAnalysisData(null);
      // We can also set an error state here if we want to show it in the UI
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <DiscoveryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNiche={selectedNiche}
        setSelectedNiche={setSelectedNiche}
        onSearch={handleSearch}
      />

      {error && (
        <div style={{ padding: 16, background: "#FEF2F2", color: "#DC2626", borderRadius: 12, marginBottom: 24 }}>
          {error}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CreatorGrid 
          creators={creators} 
          isLoading={isSearching} 
          onAnalyze={handleAnalyze} 
        />
      </motion.div>

      <AnalysisWorkspace 
        creator={analyzingCreator}
        analysisData={analysisData}
        isLoading={isAnalyzing}
        onClose={() => setAnalyzingCreator(null)}
      />
    </div>
  );
}
