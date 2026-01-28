
import { GoogleGenAI } from "@google/genai";
import { Plant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGardenSummary(plants: Plant[]): Promise<string> {
  if (plants.length === 0) return "Dein Garten ist noch leer. Wähle ein paar Pflanzen aus!";

  const plantNames = plants.map(p => p.name).join(", ");
  const prompt = `Du bist ein freundlicher Garten-Coach für Anfänger. 
  Der Nutzer hat folgende Pflanzen in seinem Beet geplant: ${plantNames}.
  Gib eine kurze, motivierende Zusammenfassung (max 3 Sätze) auf Deutsch. 
  Erkläre kurz, warum diese Auswahl gut ist oder worauf man als Anfänger bei dieser speziellen Mischung achten sollte. 
  Vermeide Fachbegriffe.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Viel Erfolg mit deinem neuen Garten!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Deine Pflanzenauswahl sieht toll aus! Ein guter Mix für den Start.";
  }
}
