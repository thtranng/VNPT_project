
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeTranscript = async (transcript: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Please summarize the following meeting transcript in 3-4 bullet points focusing on key outcomes and next steps: ${transcript}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing transcript:", error);
    return "Failed to generate summary.";
  }
};

export const chatWithAssistant = async (query: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context from meeting: ${context}\n\nUser Question: ${query}`,
      config: {
        systemInstruction: "You are ClerkBot, a helpful AI meeting assistant. Answer questions based ONLY on the provided meeting context. Be concise.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error chatting with assistant:", error);
    return "I'm sorry, I couldn't process that request right now.";
  }
};

export const generateFollowUpEmail = async (actionItems: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a professional follow-up email based on these action items: ${actionItems.join(", ")}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating follow-up email:", error);
    return "Failed to generate draft.";
  }
};
