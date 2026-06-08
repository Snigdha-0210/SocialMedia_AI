# Creator OS - Social Media AI Dashboard

Creator OS is a Next.js-powered, AI-driven dashboard built for content creators and marketers to analyze trends, discover top creators, and optimize their social media strategy across YouTube, Instagram, and TikTok.

## Features

- **Live Trend Discovery**: Real-time social media trends across multiple platforms.
- **Top Creator Search**: Scrape and analyze the top-performing content creators by niche.
- **Viral Feed**: Discover the most viral Reels and Shorts instantly.
- **AI Analytics**: Deep dive into audience demographics, growth scores, and engagement potential using Llama 3 AI.
- **Fallback Engine**: Bulletproof fallback mechanisms ensure the platform never crashes even if external APIs hit rate limits.

## Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **AI Integration**: Groq SDK (Llama 3 Models)
- **Data APIs**: YouTube Data API v3
- **Database**: Firebase (Firestore)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example` and add your API keys.
4. Run the development server:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
