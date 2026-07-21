import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnalyticsTitle from "../../components/AnalyticsTitle";

describe("Analytics Title Testing", () => {
  const dashboardContent = [
    {
      label: "title",
      text: "Analytics Dashboard",
    },
    {
      label: "subtitle",
      text: "WaterWise Intelligent Decision Support Services",
    },
  ];

  it.each(dashboardContent)(
    "should render dashboard Title and Subtitle",
    ({ text }) => {
      // Arrange
      render(<AnalyticsTitle />);

      // Act
      const result = screen.getByText(text);

      // Assert
      expect(result).toBeInTheDocument();
    }
  );
});