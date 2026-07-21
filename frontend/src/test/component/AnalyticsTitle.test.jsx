import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import AnalyticsTitle from "../../components/AnalyticsTitle";

describe("Analytics Title Testing", () => {
  const dashboardContent = [
    {
      label: "section label",
      text: "WaterWise Analytics",
    },
    {
      label: "subtitle",
      text: "WaterWise Intelligent Decision Support Services",
    },
  ];

  it.each(dashboardContent)(
    "should render analytics title content",
    ({ text }) => {
      // Arrange
      render(<AnalyticsTitle />);

      // Act
      const result = screen.getByText(text);

      // Assert
      expect(result).toBeInTheDocument();
    },
  );
});
