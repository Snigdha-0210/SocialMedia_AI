import { ContentDraft } from "@/types";

export interface AudiencePrediction {
  bestAudience: string;
  bestPlatform: string;
  bestPostingTime: string;
  estimatedReach: string;
  expectedEngagement: string;
  confidenceScore: number;
}

export class AudiencePredictor {
  
  /**
   * Generates a prediction based on the generated draft content.
   */
  static async predict(draft: Partial<ContentDraft>): Promise<AudiencePrediction> {
    const prompt = `
      You are an expert social media data scientist. Analyze the following content draft and predict its performance.
      
      Content Draft Hook: ${draft.hook}
      Content Key Insights: ${draft.keyInsights}
      Virality Score: ${draft.viralityScore}

      Respond strictly in JSON format matching this structure:
      {
        "bestAudience": "e.g., Tech Professionals 25-34",
        "bestPlatform": "e.g., LinkedIn",
        "bestPostingTime": "e.g., Tuesday 9:00 AM EST",
        "estimatedReach": "e.g., 50k - 100k views",
        "expectedEngagement": "e.g., 3.5%",
        "confidenceScore": 85
      }
    `;

    try {
      if (process.env.GROQ_API_KEY) {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            response_format: { type: "json_object" }
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const text = groqData.choices[0].message.content;
          const jsonMatch = text.match(/\`\`\`(?:json)?\\n([\\s\\S]*?)\\n\`\`\`/);
          const jsonStr = jsonMatch ? jsonMatch[1] : text;
          return JSON.parse(jsonStr) as AudiencePrediction;
        }
      }
      
      // Fallback
      return {
        bestAudience: "General Audience",
        bestPlatform: "Instagram",
        bestPostingTime: "Wednesday 12:00 PM",
        estimatedReach: "10k - 50k",
        expectedEngagement: "2.1%",
        confidenceScore: 70
      };
    } catch (e) {
      console.error("Failed to predict audience", e);
      return {
        bestAudience: "General Audience",
        bestPlatform: "Instagram",
        bestPostingTime: "Wednesday 12:00 PM",
        estimatedReach: "10k - 50k",
        expectedEngagement: "2.1%",
        confidenceScore: 70
      };
    }
  }
}
