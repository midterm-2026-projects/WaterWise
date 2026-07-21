import { describe, it, expect } from "vitest";

describe("Anomaly API Integration", () => {

  describe("Overall", () => {

    it("should fetch overall monthly anomaly", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/overall/monthly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("hasAnomaly");
      expect(result).toHaveProperty("riskScore");
      expect(result).toHaveProperty("anomalies");
    });

    it("should fetch overall yearly anomaly", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/overall/yearly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("summary");
      expect(result).toHaveProperty("anomalies");
    });

  });

  describe("Purok", () => {

    it("should fetch purok monthly anomaly", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/purok/1/monthly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("purok");
      expect(result).toHaveProperty("hasAnomaly");
      expect(result).toHaveProperty("riskScore");
    });

    it("should fetch purok yearly anomaly", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/purok/1/yearly");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toHaveProperty("purok");
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("anomalies");
    });

  });

  describe("All Puroks", () => {

    it("should fetch all puroks monthly anomaly", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/puroks/monthly");

      // Act
      const result = await response.json();

      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("status");
    });

    it("should fetch all puroks yearly anomaly", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/puroks/yearly");

      // Act
      const result = await response.json();

      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("status");
    });

  });

  describe("Generate", () => {

    it("should generate all anomalies", async () => {
      // Arrange
      const response = await fetch("/api/anomaly/all");

      // Act
      const result = await response.json();

      // Assert
      expect(result).toBeDefined();
    });

  });

});