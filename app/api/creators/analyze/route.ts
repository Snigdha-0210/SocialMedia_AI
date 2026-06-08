import { NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { creator } = body;

    if (!creator || !creator.id) {
      return NextResponse.json({ error: "Creator data is required" }, { status: 400 });
    }

    // 1. Fetch recent videos for the channel to provide real context to the AI
    const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    let recentVideos: any[] = [];
    
    if (apiKey) {
      try {
        const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${creator.id}&maxResults=5&order=date&type=video&key=${apiKey}`;
        const videosRes = await fetch(videosUrl, { cache: 'no-store' });
        const videosData = await videosRes.json();
        
        if (videosData.items) {
          recentVideos = videosData.items.map((item: any) => ({
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            videoId: item.id.videoId,
            description: item.snippet.description
          }));
        }
      } catch (err) {
        console.error("Failed to fetch recent videos", err);
      }
    }

    const prompt = `You are a world-class YouTube strategist and Creator Intelligence Analyst. 
Analyze the creator "${creator.name}" in the "${creator.category}" category.

CRITICAL INSTRUCTION: Your entire response MUST be hyper-specific to ${creator.name}. You must explicitly reference their unique editing style, their actual common phrases, and their specific video formats. Do NOT output generic advice. If "Recent Videos" is empty, use your extensive training data knowledge about who ${creator.name} is and what they specifically post.

CREATOR DATA:
Name: ${creator.name}
Subscribers: ${creator.subscribers}
Total Views: ${creator.totalViews}
Category: ${creator.category}
Recent Videos: ${JSON.stringify(recentVideos)}
Description: ${creator.description}

Generate a JSON object exactly matching this interface:
{
  "successAnalysis": "Detailed paragraph explaining exactly why ${creator.name} succeeded (mention their specific storytelling, pacing, or unique quirks).",
  "contentStrategy": {
    "hookStyle": "e.g. Their specific high energy curiosity hooks",
    "videoStructure": "e.g. Intro -> specific segment -> Outro",
    "contentThemes": ["Specific Theme 1", "Specific Theme 2", "Specific Theme 3"],
    "audienceTargeting": "e.g. Their exact demographic"
  },
  "viralVideoAnalysis": [
    {
      "title": "A real or highly realistic viral video title for ${creator.name}",
      "views": "1.2M",
      "uploadDate": "2 months ago",
      "viralityScore": 95,
      "explanation": "Exactly why this specific video blew up for them"
    }
  ],
  "aiLearning": [
    "Actionable lesson 1 from their specific style",
    "Actionable lesson 2 from their specific style",
    "Actionable lesson 3 from their specific style"
  ],
  "successBlueprint": {
    "contentPillars": ["Pillar 1", "Pillar 2"],
    "uploadFrequency": "Suggested frequency",
    "hookFormula": "Their specific hook strategy",
    "thumbnailFormula": "Their specific thumbnail visual style",
    "retentionStrategy": "How they specifically keep people watching"
  },
  "growthTrajectory": {
    "currentPhase": "e.g. Exponential scaling",
    "projectedFuture": "Where their channel is heading",
    "growthCatalysts": ["Catalyst 1", "Catalyst 2"]
  },
  "monetizationStrategy": [
    "Their specific sponsorship strategy",
    "Digital products / Courses",
    "Merchandising"
  ],
  "similarCreators": [
    { "name": "A real similar creator to ${creator.name}", "similarityScore": 92 },
    { "name": "Another real similar creator", "similarityScore": 85 },
    { "name": "A third real similar creator", "similarityScore": 78 }
  ]
}

Return ONLY valid JSON. Make the analysis insightful, highly specific to ${creator.name}, and actionable. Do not output markdown backticks.`;

    let text = "";
    try {
      if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY missing");
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.7
      });
      text = completion.choices[0]?.message?.content || "";
    } catch (groqError: any) {
      console.warn("Groq failed, falling back to Gemini:", groqError.message);
      let genAI;
      try {
        genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash-latest", // using exact alias required by v1beta
          generationConfig: {
            responseMimeType: "application/json",
          },
        });
        const result = await model.generateContent(prompt);
        text = result.response.text().trim();
      } catch (geminiError: any) {
        throw new Error("Both AI providers failed. " + geminiError.message);
      }
    }
    
    // Safer JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    
    let analysisData;
    try {
      analysisData = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON:", text);
      throw new Error("Failed to parse Gemini output as JSON. Output was malformed.");
    }

    return NextResponse.json({ analysis: analysisData });
  } catch (error: any) {
    console.error("Creator analysis failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze creator" },
      { status: 500 }
    );
  }
}
