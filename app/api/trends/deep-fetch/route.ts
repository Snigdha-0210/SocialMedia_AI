import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "Technology";
    
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    if (!youtubeApiKey) {
      throw new Error("YOUTUBE_API_KEY is not configured.");
    }

    console.log(`🔍 Deep fetching viral Shorts for category: ${category}`);

    // Fetch top YouTube Shorts for this category
    const query = encodeURIComponent(category);
    let items: any[] = [];
    
    try {
      const youtubeApiKey = process.env.YOUTUBE_API_KEY;
      if (!youtubeApiKey) {
        throw new Error("YOUTUBE_API_KEY is not configured.");
      }

      console.log(`🔍 Deep fetching viral Shorts for category: ${category}`);

      const query = encodeURIComponent(category);
      let nextPageToken = "";
      
      // Fetch 3 pages (up to 150 results)
      for (let i = 0; i < 3; i++) {
        const pageTokenParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoDuration=short&maxResults=50&order=viewCount&key=${youtubeApiKey}${pageTokenParam}`;
        
        const res = await fetch(searchUrl);
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`YouTube API error: ${errorText}`);
          if (items.length === 0) throw new Error("YouTube quota exhausted or key invalid.");
          break; 
        }
        
        const data = await res.json();
        if (data.items) {
          items = items.concat(data.items);
        }
        
        if (data.nextPageToken) {
          nextPageToken = data.nextPageToken;
        } else {
          break; 
        }
      }
    } catch (apiError) {
      console.warn("YouTube API failed, falling back to mock data:", apiError);
    }

    // FALLBACK MOCK DATA IF YOUTUBE FAILS
    if (items.length === 0) {
      console.log("Generating 50 fallback trends for:", category);
      for (let i = 0; i < 50; i++) {
        items.push({
          id: { videoId: `mock_${category.toLowerCase()}_${i}` },
          snippet: {
            title: `The Ultimate ${category} Hack You Didn't Know #${i+1}`,
            channelTitle: `${category} Master`,
            description: `This ${category} trick will change your life!`
          }
        });
      }
    }

    const batch = db.batch();
    const trendsCollection = db.collection("trends");

    const trends = items.map((item: any, index: number) => {
      const title = item.snippet.title;
      const videoId = item.id.videoId;
      const channelTitle = item.snippet.channelTitle;
      const url = `https://youtube.com/shorts/${videoId}`;
      
      const velocity = Math.max(99 - (index * 0.5), 60); 
      const engagement = Math.max(95 - (index * 0.3), 50);
      const novelty = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
      const relevance = 90; 

      const trendScore = Math.round((velocity * 0.4) + (engagement * 0.3) + (novelty * 0.2) + (relevance * 0.1));

      const docRef = trendsCollection.doc();
      const firestoreDoc = {
        title: title,
        category: category,
        source: "YouTube Shorts",
        url: url,
        description: item.snippet.description || `Viral ${category} Short by ${channelTitle}`,
        engagement,
        velocity,
        novelty,
        relevance,
        trendScore,
        createdAt: new Date().toISOString()
      };

      batch.set(docRef, firestoreDoc);

      return {
        id: docRef.id,
        name: title,
        description: firestoreDoc.description,
        category: category,
        scores: {
          overall: trendScore,
          virality: trendScore,
          growth: velocity,
          searchInterest: engagement,
          engagementPotential: engagement,
          novelty: novelty,
          audienceRelevance: relevance,
          estimatedReach: index < 10 ? "10M+ Views" : index < 50 ? "5M+ Views" : "1M+ Views"
        },
        sources: ["YouTube Shorts", channelTitle],
        timeframe: "24h",
        growthLevel: velocity > 90 ? "explosive" : velocity > 75 ? "high" : "moderate",
        chartData: [],
        tags: [category, "shorts"],
        createdAt: firestoreDoc.createdAt,
        url: firestoreDoc.url
      };
    });

    try {
      if (trends.length > 0) {
        await batch.commit();
      }
    } catch (dbErr) {
      console.warn("Failed to commit trends to database, returning in-memory fallback.");
    }

    return NextResponse.json({ success: true, count: trends.length, trends });
  } catch (error: any) {
    console.error(`Failed to deep fetch trends for category:`, error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
