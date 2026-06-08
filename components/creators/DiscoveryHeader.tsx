import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface DiscoveryHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedNiche: string;
  setSelectedNiche: (n: string) => void;
  onSearch: () => void;
}

const NICHES = [
  "AI", "Technology", "Business", "Finance", "Startups", "Creator Economy", "Marketing", "Productivity", "Career",
  "Education", "Programming", "Science", "Politics", "History", "Travel", "Food", "Street Food", "Cooking",
  "Fitness", "Gym", "Sports", "Cricket", "Football", "Basketball", "Movies", "TV Shows", "Anime", "Gaming",
  "Pets", "Animals", "Nature", "Luxury", "Fashion", "Beauty", "Lifestyle", "Relationships", "Psychology",
  "Motivation", "Self Improvement", "Books", "Podcasts", "News", "Entertainment", "Memes", "Vlogging"
];

export default function DiscoveryHeader({
  searchQuery,
  setSearchQuery,
  selectedNiche,
  setSelectedNiche,
  onSearch
}: DiscoveryHeaderProps) {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    setSearchQuery(""); // Clear search when picking a niche
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" }}>
        Creator Intelligence Hub
      </h1>
      <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 32 }}>
        Discover top creators, analyze their growth patterns, and reverse-engineer their success.
      </p>

      <div style={{ position: "relative", maxWidth: 600, marginBottom: 24 }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          color: "#9CA3AF"
        }}>
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search creators by name, channel, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: "16px 16px 16px 48px",
            borderRadius: 20,
            border: "1px solid #E5E7EB",
            fontSize: 16,
            outline: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            background: "#FFFFFF",
            transition: "all 0.2s ease"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#4F46E5";
            e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#E5E7EB";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
          }}
        />
        <button
          onClick={onSearch}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            bottom: 8,
            padding: "0 20px",
            background: "#111827",
            color: "#FFF",
            borderRadius: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#374151"}
          onMouseOut={(e) => e.currentTarget.style.background = "#111827"}
        >
          Search
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {NICHES.map((niche) => {
          const isSelected = selectedNiche === niche;
          return (
            <motion.button
              key={niche}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNicheSelect(niche)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                background: isSelected ? "#111827" : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : "#374151",
                border: isSelected ? "1px solid #111827" : "1px solid #E5E7EB",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: isSelected ? "0 4px 6px rgba(0,0,0,0.1)" : "0 1px 2px rgba(0,0,0,0.02)",
                transition: "all 0.2s"
              }}
            >
              {niche}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
