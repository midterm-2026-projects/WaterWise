import { describe, it, expect } from "vitest";

describe("Recommendation API Integration", () => {

  describe("Overall", () => {

    it("should fetch overall monthly recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation/overall/monthly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("summary");
      expect(result).toHaveProperty("recommendations");
      expect(Array.isArray(result.recommendations)).toBe(true);
    });

    it("should fetch overall yearly recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation/overall/yearly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("summary");
      expect(result).toHaveProperty("recommendations");
      expect(Array.isArray(result.recommendations)).toBe(true);
    });

  });

  describe("Purok", () => {

    it("should fetch purok monthly recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation/purok/1/monthly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("purok");
      expect(result).toHaveProperty("summary");
      expect(result).toHaveProperty("recommendations");
    });

    it("should fetch purok yearly recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation/purok/1/yearly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("purok");
      expect(result).toHaveProperty("summary");
      expect(result).toHaveProperty("recommendations");
    });

  });

  describe("All Puroks", () => {

    it("should fetch all puroks monthly recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation/puroks/monthly");

      // Act
      const result = await response.json();

      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("recommendations");
    });

    it("should fetch all puroks yearly recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation/puroks/yearly");

      // Act
      const result = await response.json();

      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("recommendations");
    });

  });

  describe("Generate", () => {

    it("should fetch all recommendations", async () => {
      // Arrange
      const response = await fetch("/api/recommendation");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("overallMonthly");
      expect(result).toHaveProperty("overallYearly");
      expect(result).toHaveProperty("allPuroksMonthly");
      expect(result).toHaveProperty("allPuroksYearly");
    });

  });

});