"use client";

import GlobalTrendingTable from "@/components/dashboard/GlobalTrendingTable";
import HottestReelsGrid from "@/components/dashboard/HottestReelsGrid";
import TrendingReelsList from "@/components/dashboard/TrendingReelsList";
import GrowthPotentialList from "@/components/dashboard/GrowthPotentialList";
import CategoryRankings from "@/components/dashboard/CategoryRankings";
import CategoryHeatmap from "@/components/dashboard/CategoryHeatmap";
import AIInsights from "@/components/dashboard/AIInsights";
import ProfileOnboarding from "@/components/home/ProfileOnboarding";

export default function HomePage() {
  return (
    <>
      <ProfileOnboarding />

      <div className="max-w-[1600px] mx-auto px-6 py-6 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 pb-24 bg-[#F8FAFC] min-h-screen font-sans">

        {/* 1. Row 1: The Three Engines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrendingReelsList />
          <GrowthPotentialList />
          <AIInsights />
        </div>

        {/* 2. Global Top 20 Trending Reels Table */}
        <GlobalTrendingTable />

        {/* 3. Hottest Reels Right Now */}
        <HottestReelsGrid />

        {/* 4. Trending Categories */}
        <CategoryRankings />

        {/* 5. Bottom Section: Heatmap */}
        <div className="grid grid-cols-1 gap-6">
          <CategoryHeatmap />
        </div>

      </div>
    </>
  );
}
