"use client";

import CommandCenter from "@/components/home/CommandCenter";
import AnalyticsStrip from "@/components/home/AnalyticsStrip";
import TrendingList from "@/components/home/TrendingList";
import ModernTimeline from "@/components/home/ModernTimeline";
import ActionTiles from "@/components/home/ActionTiles";
import ProfileOnboarding from "@/components/home/ProfileOnboarding";
import GlobalTrendsTable from "@/components/home/GlobalTrendsTable";
import GrowthPotentialList from "@/components/home/GrowthPotentialList";

export default function HomePage() {
  return (
    <>
      <ProfileOnboarding />
      <div className="flex flex-col gap-8 pb-24">
      
      {/* 1. Hero Section - Single Card */}
      <CommandCenter />

      {/* 2. Analytics Strip - Shared Horizontal Row */}
      <AnalyticsStrip />

      {/* 3. Action Tiles - Moved up for quick access */}
      <ActionTiles />

      {/* 4. Two Column Layout - Trending List vs Timeline */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch" style={{ minHeight: 480 }}>
        <div className="flex-[0.6]">
          <TrendingList />
        </div>
        <div className="flex-[0.4]">
          <ModernTimeline />
        </div>
      </div>

      {/* 5. Highest Growth Potential */}
      <GrowthPotentialList />

      {/* 6. Global Top Trending Topics */}
      <GlobalTrendsTable />

      </div>
    </>
  );
}
