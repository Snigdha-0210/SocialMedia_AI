import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactName, messages, draftType } = body;

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing");
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const conversationHistory = messages?.map((m: any) => `${m.role === 'user' ? 'Me' : contactName}: ${m.content}`).join("\n") || "No previous messages.";

    let styleInstruction = "";
    switch (draftType) {
      case "smart":
        styleInstruction = "Write a smart, contextual, and polite reply addressing their last message.";
        break;
      case "collab":
        styleInstruction = "Write a pitch proposing a content collaboration (e.g., guest appearance, shoutout). Keep it enthusiastic.";
        break;
      case "sponsor":
        styleInstruction = "Write a pitch to secure a brand sponsorship. Mention audience overlap, engagement metrics, and Q3/Q4 integration goals.";
        break;
      case "investor":
        styleInstruction = "Write a professional message to an investor. Mention raising a seed round, scaling metrics, and asking for a 15-min intro call.";
        break;
      default:
        styleInstruction = "Write a polite reply.";
    }

    const prompt = `You are an AI assistant helping a content creator write a message to "${contactName}".
Your task is to generate a draft message based on the requested style:
[STYLE INSTRUCTION]: ${styleInstruction}

Here is the conversation history so far:
${conversationHistory}

Generate a JSON object containing exactly 4 distinct variants of the message. The JSON format MUST be:
{
  "short": "Very concise, 1-2 sentences.",
  "professional": "Formal, business-focused, structured.",
  "friendly": "Warm, casual, highly enthusiastic.",
  "aggressive": "High-confidence, direct, focused on rapid growth and immediate ROI."
}

Generate ONLY valid JSON. Do not include markdown backticks or any conversational filler.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6,
    });

    const draftText = completion.choices[0]?.message?.content || "{}";
    const draftJson = JSON.parse(draftText);

    return NextResponse.json({ variants: draftJson });
  } catch (error: any) {
    console.error("Draft generation failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate draft" },
      { status: 500 }
    );
  }
}
