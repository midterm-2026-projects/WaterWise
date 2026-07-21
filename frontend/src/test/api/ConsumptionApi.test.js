import { describe, it, expect } from "vitest";

describe("Consumption API Integration", () => {

  describe("Prediction API", () => {

    it("should fetch monthly consumption prediction", async () => {
      // Arrange
      const response = await fetch("/api/monthly");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("month");
      expect(result[0]).toHaveProperty("consumption");
      expect(result[5].predicted).toBe(true);
    });

    it("should fetch yearly consumption prediction", async () => {
      // Arrange
      const response = await fetch("/api/yearly");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("year");
      expect(result[0]).toHaveProperty("consumption");
    });

    it("should fetch purok monthly prediction", async () => {
      // Arrange
      const response = await fetch("/api/purok/monthly");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("predicted");
    });

    it("should fetch purok yearly prediction", async () => {
      // Arrange
      const response = await fetch("/api/purok/yearly");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("historical");
      expect(result[0]).toHaveProperty("predicted");
    });

  });

    describe("History API", () => {

    it("should fetch overall monthly history", async () => {
      // Arrange
      const response = await fetch("/api/history/monthly");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("month");
      expect(result[0]).toHaveProperty("consumption");
    });

    it("should fetch overall yearly history", async () => {
      // Arrange
      const response = await fetch("/api/history/yearly");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("year");
      expect(result[0]).toHaveProperty("consumption");
    });

    it("should fetch purok monthly history", async () => {
      // Arrange
      const response = await fetch("/api/history/monthly/purok/1");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("month");
      expect(result[0]).toHaveProperty("consumption");
    });

    it("should fetch purok yearly history", async () => {
      // Arrange
      const response = await fetch("/api/history/yearly/purok/1");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("year");
      expect(result[0]).toHaveProperty("consumption");
    });

    it("should fetch all puroks monthly history", async () => {
      // Arrange
      const response = await fetch("/api/history/monthly/all-puroks");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("historical");
    });

    it("should fetch all puroks yearly history", async () => {
      // Arrange
      const response = await fetch("/api/history/yearly/all-puroks");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("historical");
    });

    it("should generate all history", async () => {
      // Arrange
      const response = await fetch("/api/history/generate-all");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveProperty("overallMonthly");
      expect(result).toHaveProperty("overallYearly");
      expect(result).toHaveProperty("allPuroksMonthly");
      expect(result).toHaveProperty("allPuroksYearly");
    });

  });

    describe("Ranking API", () => {

    it("should fetch consumption ranking", async () => {
      // Arrange
      const response = await fetch("/api/ranking");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty("rank");
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("consumption");
      expect(result[0].rank).toBe(1);
    });

  });

  describe("AI Prediction API", () => {

    it("should fetch overall monthly AI prediction", async () => {
      // Arrange
      const response = await fetch("/api/prediction/monthly/overall");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveProperty("predictedConsumption");
    });

    it("should fetch overall yearly AI prediction", async () => {
      // Arrange
      const response = await fetch("/api/prediction/yearly/overall");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveProperty("predictedConsumption");
    });

    it("should fetch purok monthly AI prediction", async () => {
      // Arrange
      const response = await fetch("/api/prediction/monthly/purok/1");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveProperty("purok");
      expect(result).toHaveProperty("predictedConsumption");
      expect(result.purok).toBe("1");
    });

    it("should fetch purok yearly AI prediction", async () => {
      // Arrange
      const response = await fetch("/api/prediction/yearly/purok/1");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveProperty("purok");
      expect(result).toHaveProperty("predictedConsumption");
      expect(result.purok).toBe("1");
    });

    it("should fetch all puroks monthly prediction", async () => {
      // Arrange
      const response = await fetch("/api/prediction/monthly/all-puroks");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0].purok).toBe("Purok 1");
      expect(result[0]).toHaveProperty("predictedConsumption");
    });

    it("should fetch all puroks yearly prediction", async () => {
      // Arrange
      const response = await fetch("/api/prediction/yearly/all-puroks");
      // Act
      const result = await response.json();
      // Assert
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty("purok");
      expect(result[0]).toHaveProperty("predictedConsumption");
    });

    it("should generate all AI predictions", async () => {
      // Arrange
      const response = await fetch("/api/prediction/generate-all");
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