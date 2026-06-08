import { db } from "@/lib/firebase";
import { CreatorData, UserProfile } from "@/types";

export class SocialGraphEngine {
  
  /**
   * Recommends creators by comparing user interests against creator embeddings (cosine similarity mock)
   */
  static async recommendCreators(userId: string): Promise<CreatorData[]> {
    try {
      const userDoc = await db.collection("user_profiles").doc(userId).get();
      if (!userDoc.exists) return [];
      
      const userProfile = userDoc.data() as UserProfile;
      const userInterests = userProfile.interests || {};
      
      const creatorsSnapshot = await db.collection("creators").get();
      const creators: CreatorData[] = [];
      
      creatorsSnapshot.forEach(doc => {
        const data = doc.data() as CreatorData;
        
        // Simple dot product/cosine similarity mock
        let score = 0;
        let userMag = 0;
        let creatorMag = 0;
        
        for (const [topic, uVal] of Object.entries(userInterests)) {
          const cVal = data.embeddings?.[topic] || 0;
          score += uVal * cVal;
          userMag += uVal * uVal;
        }
        
        for (const cVal of Object.values(data.embeddings || {})) {
          creatorMag += cVal * cVal;
        }
        
        let matchPercent = 0;
        if (userMag > 0 && creatorMag > 0) {
          matchPercent = score / (Math.sqrt(userMag) * Math.sqrt(creatorMag));
        }
        
        creators.push({
          ...data,
          matchScore: Math.round(matchPercent * 100),
          audienceOverlap: `${Math.round(matchPercent * 60)}%`,
          growthVelocity: data.growthVelocity || "Moderate"
        });
      });
      
      // Sort by match score descending
      return creators.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } catch (e) {
      console.error("Failed to recommend creators", e);
      return [];
    }
  }

  /**
   * Recommends topics to a user
   */
  static async recommendTopics(userId: string): Promise<string[]> {
    const userDoc = await db.collection("user_profiles").doc(userId).get();
    if (!userDoc.exists) return ["AI", "Startups", "Growth"];
    
    const profile = userDoc.data() as UserProfile;
    const sortedTopics = Object.entries(profile.interests || {})
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
      
    return sortedTopics.slice(0, 5);
  }
}
