"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FeedPost } from "@/types";
import { Sparkles, Filter, MapPin, Video, Camera, Tag } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import FeedCard from "@/components/feed/FeedCard";

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [niche, setNiche] = useState("AI");
  const [location, setLocation] = useState("Global");
  
  const user = useAppStore(state => state.user);

  useEffect(() => {
    async function fetchFeed() {
      setLoading(true);
      try {
        const res = await fetch(`/api/feed/ranked?niche=${encodeURIComponent(niche)}&location=${encodeURIComponent(location)}&_t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch (err) {
        console.error("Failed to fetch feed", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFeed();
  }, [niche, location]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="card p-6 animate-pulse h-64 bg-gray-50 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 pb-24">
      <div className="page-header mb-8">
        <h1 className="page-title flex items-center gap-2">
          <Sparkles className="text-accent" size={24} />
          For You
        </h1>
        <p className="page-subtitle">AI-ranked intelligence feed tailored to your interests.</p>
      </div>

      <div className="card p-6 mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex gap-4 items-center flex-wrap w-full">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Tag size={16} className="text-text-muted" />
            <select 
              value={niche} 
              onChange={e => setNiche(e.target.value)}
              className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-base text-text-primary focus:outline-none focus:border-accent font-semibold w-full shadow-sm"
            >
              {[
                "AI", "Technology", "Business", "Finance", "Startups", "Creator Economy", "Marketing", "Productivity", "Career",
                "Education", "Programming", "Science", "Politics", "History", "Travel", "Food", "Street Food", "Cooking",
                "Fitness", "Gym", "Sports", "Cricket", "Football", "Basketball", "Movies", "TV Shows", "Anime", "Gaming",
                "Pets", "Animals", "Nature", "Luxury", "Fashion", "Beauty", "Lifestyle", "Relationships", "Psychology",
                "Motivation", "Self Improvement", "Books", "Podcasts", "News", "Entertainment", "Memes", "Vlogging",
                "Personal Stories", "College Life", "Study Tips", "Entrepreneurship", "Side Hustles"
              ].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <MapPin size={16} className="text-text-muted" />
            <select 
              value={location} 
              onChange={e => setLocation(e.target.value)}
              className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-base text-text-primary focus:outline-none focus:border-accent font-semibold w-full shadow-sm"
            >
              <option value="Global">Global 🌍</option>
              <option value="US">United States 🇺🇸</option>
              <option value="UK">United Kingdom 🇬🇧</option>
              <option value="India">India 🇮🇳</option>
              <option value="Europe">Europe 🇪🇺</option>
              <option value="Australia">Australia 🇦🇺</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 mt-12">
        
        {/* Instagram Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black flex items-center gap-2 text-text-primary">
              <Camera className="text-pink-600" size={24} /> Top 50 Instagram Reels
            </h2>
          </div>
          {posts.length === 0 ? (
            <div className="card p-8 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-text-muted">No posts found.</p>
            </div>
          ) : (
            <div className="bg-bg-primary border border-border-subtle rounded-[24px] p-6 shadow-sm">
              <div className="overflow-y-auto pr-4" style={{ height: "1150px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {posts.filter(p => (p as any).platform === "Instagram Reels").slice(0, 50).map((post, idx) => (
                    <FeedCard key={post.id} post={post} index={idx} rank={idx + 1} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* YouTube Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black flex items-center gap-2 text-text-primary">
              <Video className="text-red-600" size={24} /> Top 50 YouTube Shorts
            </h2>
          </div>
          {posts.length === 0 ? (
            <div className="card p-8 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-text-muted">No posts found.</p>
            </div>
          ) : (
            <div className="bg-bg-primary border border-border-subtle rounded-[24px] p-6 shadow-sm">
              <div className="overflow-y-auto pr-4" style={{ height: "1150px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {posts.filter(p => (p as any).platform === "YouTube Shorts").slice(0, 50).map((post, idx) => (
                    <FeedCard key={post.id} post={post} index={idx} rank={idx + 1} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

