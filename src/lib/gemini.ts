import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ColorInsight {
  psychology: string;
  culture: string;
  story: string;
}

/**
 * Generate deep insights for a color using Gemini API
 */
export async function generateColorInsight(
  hex: string,
  colorName: string,
  locale: string = "ja"
): Promise<ColorInsight | null> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    // Throw error so API route can catch it and return 500 with message
    throw new Error("GEMINI_API_KEY is not configured on server");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
      You are a world-class color theorist and poet. 
      Analyze the following color and provide insights in ${
        locale === "ja" ? "Japanese" : "English"
      }.
      
      Color HEX: ${hex}
      Color Name: ${colorName}
      
      Provide the result in the following JSON format:
      {
        "psychology": "Detailed psychological meaning and emotional impact of this color (max 150 characters).",
        "culture": "Cultural, historical, or symbolic background of this color (max 150 characters).",
        "story": "A very short, poetic story or atmosphere inspired by this specific color (max 150 characters)."
      }
      
      The tone should be sophisticated, minimal, and premium. Avoid generic descriptions.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up potential markdown code blocks
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(text) as ColorInsight;
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON response:", text);
      throw new Error("Failed to parse AI response as JSON");
    }
  } catch (error) {
    console.error("Gemini API Error details:", error);
    // Re-throw to be caught by API route
    throw error;
  }
}
