import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KpiCard from "../../components/KpiCard";
import { kpiData } from "../../data/analyticsData";

describe("KpiCard Data Driven Testing", () => {
  it.each(kpiData)(
    "should display title, metric value and subtitle for overall, monthly, yearly, and per purok consumption KPI cards: $title",
    ({ title, value, subtitle }) => {
      // Arrange
      render(
        <KpiCard
          title={title}
          value={value}
          subtitle={subtitle}
        />
      );

      // Act
      const titleElement = screen.getByText(title);
      const valueElement = screen.getByText(value);
      const subtitleElement = screen.getByText(subtitle);

      // Assert
      expect(titleElement).toBeInTheDocument();
      expect(valueElement).toBeInTheDocument();
      expect(subtitleElement).toBeInTheDocument();
    }
  );
});