import { describe, it, expect } from "vitest";
import {
  ai,
  GEMINI_MODELS,
} from "../../config/gemini.js";

const hasGeminiKey = Boolean(
  process.env.GEMINI_API_KEY
);

const integrationTest = hasGeminiKey
  ? it
  : it.skip;


describe("Validate Gemini Integration", () => {

  integrationTest("should have a configured API key", () => {
    // Arrange
    const apiKey = process.env.GEMINI_API_KEY;

    // Assert
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
  });


  integrationTest("should initialize the Gemini client", () => {
    // Assert
    expect(ai).toBeTruthy();
  });


  integrationTest(
  "should successfully connect to Gemini API",
  async (context) => {
    // Arrange
    const model = GEMINI_MODELS[0];

    try {
      // Act
      const response =
        await ai.models.generateContent({
          model,
          contents: "Say hello",
        });

      // Assert
      expect(response).toBeDefined();
      expect(response.text).toBeTruthy();

    } catch (error) {

      if (
        error.message.includes("quota") ||
        error.message.includes("429") ||
        error.message.includes("RESOURCE_EXHAUSTED")
      ) {
        context.skip(
          "Skipped: Gemini API quota exceeded"
        );
      }

      throw error;
    }
  },
  30000
);

});