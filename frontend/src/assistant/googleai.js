import { GoogleGenerativeAI } from "@google/generative-ai";

//gemini ai
const googleAi = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
console.log(googleAi)

export class Assistant {
  constructor(model = "gemini-1.5-flash") {
    this.gemini = googleAi.getGenerativeModel({ model });
    this.session = this.gemini.startChat({ history: [] });
  }

  // Renamed method to avoid name clash
  async sendMessage(content) {
    try {
      // If you want chat context (multi-turn):
      const result = await this.session.sendMessage(content);
      return result.response.text();
    } catch (error) {
      console.error("AI Error:", error);
      throw error;
    }
  }
}
