import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ColorInsight } from "@/types";

export { type ColorInsight };

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
    throw new Error("GEMINI_API_KEY is not configured on server");
  }

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
    IMPORTANT: Return ONLY the JSON object. Do not include markdown formatting or code blocks.
  `;

  const candidateModels = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-flash",
    "gemini-pro",
  ];

  const errors: string[] = [];
  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      console.log(`[Gemini] Attempting to generate with model: ${modelName}`);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        return JSON.parse(text) as ColorInsight;
      } catch {
        throw new Error(`Invalid JSON from ${modelName}`);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[Gemini] Failed with model ${modelName}:`, msg);
      errors.push(`${modelName}: ${msg}`);
    }
  }

  // If we exhaust all models, throw a detailed error report
  console.error("[Gemini] All models failed.");
  throw new Error(
    `All Gemini models failed. Details: [ ${errors.join(" | ")} ]`
  );
}
