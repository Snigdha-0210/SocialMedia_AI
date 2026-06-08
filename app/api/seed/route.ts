import { NextResponse } from "next/server";
import { admin } from "@/lib/firebase";

const MOCK_CREATORS = [
  {
    name: "Alex Rivera", handle: "alex_builds", bio: "Ex-Stripe engineer building open source AI tools.",
    embeddings: { ai: 0.9, startups: 0.8, marketing: 0.2 },
    dna: { innovation: 92, authority: 88, storytelling: 75, humor: 60, education: 95, consistency: 90, trendAwareness: 85 },
    growthVelocity: "Explosive"
  },
  {
    name: "Sarah Chen", handle: "sarahcodes", bio: "Demystifying machine learning for frontend devs.",
    embeddings: { ai: 0.85, startups: 0.4, marketing: 0.1 },
    dna: { innovation: 85, authority: 90, storytelling: 88, humor: 70, education: 98, consistency: 85, trendAwareness: 80 },
    growthVelocity: "High"
  }
];

const MOCK_FEED = [
  {
    topic: "The Future of AI Agents",
    engagement: 0.08,
    trendVelocity: 95,
    freshness: 90,
    viralityScore: 92,
    content: "AI agents are moving from chatbots to autonomous workers. Here's why you need to pay attention...",
    aiExplanation: "Because you frequently engage with AI and Startup content."
  },
  {
    topic: "Next.js 14 App Router Tricks",
    engagement: 0.05,
    trendVelocity: 60,
    freshness: 80,
    viralityScore: 78,
    content: "3 underrated Next.js features that saved me 10 hours this week. 👇",
    aiExplanation: "Matches your high interest in Frontend Development."
  }
];

export async function GET() {
  try {
    const db = admin.firestore();

    // 1. Seed Creators
    const creatorsRef = db.collection("creators");
    for (const c of MOCK_CREATORS) {
      await creatorsRef.add(c);
    }

    // 2. Seed Feed Posts
    const feedRef = db.collection("feed_posts");
    for (let i=0; i<MOCK_FEED.length; i++) {
      await feedRef.add({
        ...MOCK_FEED[i],
        creator: MOCK_CREATORS[i % MOCK_CREATORS.length],
        createdAt: new Date().toISOString()
      });
    }

    // 3. Seed User Profile for 'test-user' or current user
    // We'll just create a dummy one if it doesn't exist
    await db.collection("user_profiles").doc("test-user").set({
      interests: { ai: 0.9, startups: 0.8, marketing: 0.4 },
      behavior: { avgWatchTime: 120, engagementRate: 0.23 }
    }, { merge: true });

    return NextResponse.json({ success: true, message: "OS 2.0 Mock Data Seeded successfully." });
  } catch (error: any) {
    console.error("Seeding failed", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
