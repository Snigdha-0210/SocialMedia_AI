import { NextResponse } from "next/server";
import { admin } from "@/lib/firebase";

export async function GET() {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("feed_posts")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
      
    const posts: any[] = [];
    snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    
    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error("Error fetching feed posts:", error);
    return NextResponse.json({ posts: [], error: error.message }, { status: 500 });
  }
}
