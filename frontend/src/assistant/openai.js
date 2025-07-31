import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Frontend-only, be careful
});

export class Assistant {
  constructor(model = "gpt-4o-mini", client = openai) {
    this.model = model;
    this.client = client; // store the client properly
  }

  async chat(content, history) {
    try {
      const result = await this.client.chat.completions.create({
        model: this.model,
        messages: history.map((m)=> ({
          role:m.role,
          content:m.content
        })).concat({ role: "user", content }),
      });

      return result.choices[0].message.content
    } catch (error) {
       if (error.status === 429) {
      throw new Error(
        "You have exceeded your OpenAI quota or are sending too many requests. Please try again later."
      );
    }
      console.error("OpenAI Error:", error);
    }
  }
}
