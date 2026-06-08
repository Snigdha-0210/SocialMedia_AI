import { db } from "@/lib/firebase";
import { UserProfile } from "@/types";

export class PersonalizationEngine {
  private static readonly COLLECTION = "user_profiles";

  /**
   * Fetch a user profile, or create a default one if it doesn't exist.
   */
  static async getProfile(userId: string): Promise<UserProfile> {
    const doc = await db.collection(this.COLLECTION).doc(userId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() } as UserProfile;
    }
    
    const defaultProfile: Omit<UserProfile, "id"> = {
      interests: {},
      behavior: {
        avgWatchTime: 0,
        engagementRate: 0,
      }
    };
    await db.collection(this.COLLECTION).doc(userId).set(defaultProfile);
    return { id: userId, ...defaultProfile };
  }

  /**
   * Track user engagement to continuously update their profile
   */
  static async trackEngagement(
    userId: string, 
    topicTags: string[], 
    metrics: { 
      watchTimeSecs?: number; 
      liked?: boolean; 
      shared?: boolean; 
      saved?: boolean;
      commented?: boolean;
      clicked?: boolean;
    }
  ) {
    const profile = await this.getProfile(userId);
    
    // 1. Calculate engagement score for this interaction
    let interactionScore = 0;
    if (metrics.clicked) interactionScore += 0.1;
    if (metrics.liked) interactionScore += 0.3;
    if (metrics.commented) interactionScore += 0.4;
    if (metrics.saved) interactionScore += 0.5;
    if (metrics.shared) interactionScore += 0.6;
    if (metrics.watchTimeSecs && metrics.watchTimeSecs > 10) {
      interactionScore += Math.min(0.5, metrics.watchTimeSecs / 60);
    }

    // 2. Update Interests
    const updatedInterests = { ...profile.interests };
    const learningRate = 0.15; // How fast interests shift
    
    for (const tag of topicTags) {
      const currentVal = updatedInterests[tag] || 0.1; // Baseline
      // Move towards 1.0 based on interaction score
      updatedInterests[tag] = Math.min(1.0, currentVal + (interactionScore * learningRate));
    }
    
    // Decay other interests slightly to simulate shifting preferences
    for (const key in updatedInterests) {
      if (!topicTags.includes(key)) {
        updatedInterests[key] = Math.max(0.01, updatedInterests[key] - 0.02);
      }
    }

    // 3. Update Behavior Running Averages
    const behavior = { ...profile.behavior };
    if (metrics.watchTimeSecs) {
      behavior.avgWatchTime = behavior.avgWatchTime === 0 
        ? metrics.watchTimeSecs 
        : (behavior.avgWatchTime * 0.9) + (metrics.watchTimeSecs * 0.1);
    }
    
    // Simplified engagement rate running average
    const currentEngagement = interactionScore > 0 ? 1 : 0;
    behavior.engagementRate = behavior.engagementRate === 0
      ? currentEngagement
      : (behavior.engagementRate * 0.9) + (currentEngagement * 0.1);

    // 4. Persist Updates
    await db.collection(this.COLLECTION).doc(userId).update({
      interests: updatedInterests,
      behavior
    });
  }
}
