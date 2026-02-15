
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const rewriteProductDescription = async (name: string, rawDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rewrite this AliExpress product description for a luxury beauty brand called "Lumière". 
      Make it sound sophisticated, elegant, and focus on beauty benefits, self-care routines, and high-quality results.
      
      Product Name: ${name}
      Original: ${rawDescription}
      
      Provide:
      1. A catchy product name
      2. An elegant short tagline
      3. A persuasive long description (2-3 paragraphs)
      4. A list of 3-5 key beauty benefits
      5. Suggested routine (AM, PM, or Both)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            tagline: { type: Type.STRING },
            description: { type: Type.STRING },
            benefits: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            routine: { type: Type.STRING }
          },
          required: ["name", "tagline", "description", "benefits", "routine"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("Gemini optimization failed", error);
    return null;
  }
};
