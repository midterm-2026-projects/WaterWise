import { describe, it, expect } from "vitest";
import {
  ai,
  GEMINI_MODELS,
} from "../../config/gemini.js";

const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);

const integrationIt = hasGeminiKey ? it : it.skip;

describe("Validate Gemini Integration", () => {

  integrationIt("should have a configured API key", () => {
    // Arrange
    const apiKey = process.env.GEMINI_API_KEY;

    // Assert
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
  });


  integrationIt("should initialize the Gemini client", () => {
    // Assert
    expect(ai).toBeTruthy();
  });


  integrationIt(
    "should successfully connect to Gemini API",
    async () => {
      // Arrange
      const model = GEMINI_MODELS[0];

      // Act
      const response = await ai.models.generateContent({
        model,
        contents: "Say hello",
      });

      // Assert
      expect(response).toBeDefined();
      expect(response.text).toBeTruthy();
    },
    30000
  );

});