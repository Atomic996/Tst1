
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ProjectData } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateTweet(project: ProjectData, trend?: string): Promise<string> {
    const prompt = `
      You are a world-class social media manager for the project: ${project.name}.
      Project Info: ${project.description}
      Key Features: ${project.keyFeatures.join(', ')}
      Docs Context: ${project.docs}
      
      Create a compelling, punchy Twitter thread (3 tweets) or a single high-engagement tweet.
      ${trend ? `Incorporate the trending topic: ${trend}` : ''}
      Use a mix of professional and visionary tones. 
      Include 2 relevant hashtags.
      Return ONLY the text of the tweets.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || 'Failed to generate content.';
    } catch (error) {
      console.error('Error generating tweet:', error);
      return 'Error generating content. Please check your API key.';
    }
  }

  async generateProjectImage(project: ProjectData, concept: string): Promise<string | null> {
    const prompt = `
      Create a high-quality, futuristic marketing visual for ${project.name}.
      Project context: ${project.description}.
      Visual concept: ${concept}.
      Style: Cyberpunk minimalism, clean tech aesthetic, 4k, cinematic lighting.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  }
}
