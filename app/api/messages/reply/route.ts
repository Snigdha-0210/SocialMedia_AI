import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactName, messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing");
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Format previous messages for context
    const conversationHistory = messages.map((m: any) => `${m.role === 'user' ? 'Creator' : contactName}: ${m.content}`).join("\n");

    const prompt = `You are playing the role of "${contactName}" in a chat conversation with a content creator.
Your goal is to reply to the creator's latest message naturally, adopting the persona of your name.
- If your name is a VC or Investor, act professional, ask about metrics, seed rounds, and ROI.
- If your name is a Brand Sponsor, act enthusiastic about integrations, demographics, and marketing ROI.
- If your name is another Creator, act casual, friendly, and collaborative.

Here is the conversation history:
${conversationHistory}

Reply ONLY with your next direct message. Do not include any prefixes like "Name: " or quotation marks. Keep it concise, realistic, and conversational (1-3 sentences maximum).`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const replyText = completion.choices[0]?.message?.content || "Sorry, I'm busy right now!";

    return NextResponse.json({ reply: replyText.trim() });
  } catch (error: any) {
    console.error("Chat reply failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate reply" },
      { status: 500 }
    );
  }
}
