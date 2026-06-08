import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trendName, trendCategory, trendDescription, velocity, trendUrl } = body;

    // Using the secure environment variable for the API key
    const apiKey = process.env.GROQ_API_KEY || "";
    const groq = new Groq({ apiKey });

    const promptContext = `You are a world-class social media strategist and AI data analyst.
Please perform a deep-dive analysis on the following trending topic/content:
Trend Name: "${trendName}"
Category: "${trendCategory || 'General'}"
Description: "${trendDescription || 'N/A'}"
Velocity/Growth Score: ${velocity || 85}

Provide your analysis as a JSON object with EXACTLY this structure:
{
  "analysis": "A detailed 2-3 paragraph deep-dive analysis explaining exactly WHY this trend is working, the psychological triggers it hits, and how creators can capitalize on it.",
  "researchCards": [
    { "id": "r1", "title": "Search Volume", "value": "String (e.g. 2.4M)", "trend": "up or down", "changePercent": Number, "subValue": "Short subtitle", "icon": "Search" },
    { "id": "r2", "title": "Avg Engagement", "value": "String (e.g. 12.5%)", "trend": "up or down", "changePercent": Number, "subValue": "Short subtitle", "icon": "Target" },
    { "id": "r3", "title": "Platform Momentum", "value": "High/Med/Low", "trend": "up or down", "changePercent": Number, "subValue": "Short subtitle", "icon": "TrendingUp" },
    { "id": "r4", "title": "Creator Saturation", "value": "Low/Med/High", "trend": "up or down", "changePercent": Number, "subValue": "Short subtitle", "icon": "Users" }
  ],
  "contentAngles": [
    { "id": "a1", "perspective": "Founder/Business", "hook": "Catchy hook for this angle", "predictedReach": "String (e.g. 500K)", "virality": Number (0-100), "audienceFit": Number (0-100) },
    { "id": "a2", "perspective": "Contrarian Take", "hook": "Catchy hook for this angle", "predictedReach": "String", "virality": Number, "audienceFit": Number },
    { "id": "a3", "perspective": "Educational", "hook": "Catchy hook for this angle", "predictedReach": "String", "virality": Number, "audienceFit": Number },
    { "id": "a4", "perspective": "Entertainment", "hook": "Catchy hook for this angle", "predictedReach": "String", "virality": Number, "audienceFit": Number }
  ],
  "chartData": [
    { "name": "Day 1", "value": Number (0-100), "engagement": Number (0-100) },
    // Generate exactly 30 days of realistic trending data
  ]
}

Ensure you generate exactly 30 items in the chartData array to represent the last 30 days of growth.
Do NOT include any text outside the JSON object.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: promptContext }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const responseContent = completion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(responseContent);

    return NextResponse.json({
      success: true,
      analysis: data.analysis,
      researchCards: data.researchCards,
      contentAngles: data.contentAngles,
      chartData: data.chartData
    });

  } catch (error: any) {
    console.error("Deep Dive Analysis Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
