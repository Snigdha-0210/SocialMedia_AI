import { ContentEvent } from "@/types/events";
import { METRICS_ENGINE } from "./metricsEngine";
import { db } from "@/lib/firebase";

interface FeatureWeights {
  hookWeight: number;
  emotionWeight: number;
  noveltyWeight: number;
  audienceWeight: number;
  shareabilityWeight: number;
  timingWeight: number;
  topicWeight: number;
}

const DEFAULT_WEIGHTS: FeatureWeights = {
  hookWeight: 1.0,
  emotionWeight: 1.0,
  noveltyWeight: 1.0,
  audienceWeight: 1.0,
  shareabilityWeight: 1.0,
  timingWeight: 1.0,
  topicWeight: 1.0,
};

const WEIGHTS_DOC_ID = "global_weights";

export async function getWeights(): Promise<FeatureWeights> {
  try {
    const doc = await db.collection("system_config").doc(WEIGHTS_DOC_ID).get();
    if (doc.exists) {
      return { ...DEFAULT_WEIGHTS, ...doc.data() } as FeatureWeights;
    }
    await db.collection("system_config").doc(WEIGHTS_DOC_ID).set(DEFAULT_WEIGHTS);
    return DEFAULT_WEIGHTS;
  } catch (err) {
    return { ...DEFAULT_WEIGHTS };
  }
}

export async function saveWeights(weights: FeatureWeights): Promise<void> {
  try {
    await db.collection("system_config").doc(WEIGHTS_DOC_ID).set(weights, { merge: true });
  } catch (err) {
    console.error("Failed to save weights", err);
  }
}

/**
 * Ingest real-world feedback for a generated content event.
 * Recomputes metrics, updates the event, and adjusts learning weights.
 */
export async function ingestFeedback(
  eventId: string,
  event: ContentEvent,
  actualMetrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    watchTime: number;
  }
) {
  // 1. Compute real metrics
  const engagementRate = METRICS_ENGINE.calculateEngagementRate(actualMetrics);
  const actualViralityScore = METRICS_ENGINE.calculateViralityScore(actualMetrics);
  const predictionError = METRICS_ENGINE.calculatePredictionError(event.predictedScore, actualViralityScore);
  const modelAccuracy = METRICS_ENGINE.calculateModelAccuracy(event.predictedScore, actualViralityScore);

  // 2. Update Event in DB
  const updateData = {
    actualViews: actualMetrics.views,
    actualLikes: actualMetrics.likes,
    actualShares: actualMetrics.shares,
    actualComments: actualMetrics.comments,
    actualWatchTime: actualMetrics.watchTime,
    engagementRate,
    viralityScore: actualViralityScore,
    predictionError,
    modelAccuracy,
  };
  
  await db.collection("events").doc(eventId).update(updateData);

  // 3. Update Learning Weights
  if (predictionError > 10) {
    const weights = await getWeights();
    const learningRate = 0.05;
    
    const overpredicted = event.predictedScore > actualViralityScore;
    const direction = overpredicted ? -1 : 1;
    
    weights.hookWeight = Math.max(0.5, Math.min(2.0, weights.hookWeight + (learningRate * direction)));
    weights.emotionWeight = Math.max(0.5, Math.min(2.0, weights.emotionWeight + (learningRate * direction)));
    weights.shareabilityWeight = Math.max(0.5, Math.min(2.0, weights.shareabilityWeight + (learningRate * direction)));
    weights.timingWeight = Math.max(0.5, Math.min(2.0, weights.timingWeight + (learningRate * direction)));
    weights.topicWeight = Math.max(0.5, Math.min(2.0, weights.topicWeight + (learningRate * direction)));

    await saveWeights(weights);
  }

  const updatedEvent = { ...event, ...updateData };
  return updatedEvent;
}

