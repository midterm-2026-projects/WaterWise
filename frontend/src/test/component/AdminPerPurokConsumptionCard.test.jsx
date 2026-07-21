import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdminPerPurokConsumptionCard from "../../components/AdminPerPurokConsumptionCard";

describe("AdminPerPurokConsumptionCard", () => {
  it("should render all six puroks correctly", () => {
    // Arrange
    const puroks = [
      { name: "Purok 1", value: "1200" },
      { name: "Purok 2", value: "980" },
      { name: "Purok 3", value: "1150" },
      { name: "Purok 4", value: "890" },
      { name: "Purok 5", value: "760" },
      { name: "Purok 6", value: "1025" },
    ];

    render(
      <AdminPerPurokConsumptionCard
        puroks={puroks}
      />
    );

    // Assert
    puroks.forEach((purok) => {
      expect(
        screen.getByText(purok.name)
      ).toBeInTheDocument();

      expect(
        screen.getByText(`- ${purok.value}`)
      ).toBeInTheDocument();
    });
  });

  it("should render six default puroks when no data is provided", () => {
    // Arrange
    render(<AdminPerPurokConsumptionCard />);

    // Assert
    for (let i = 1; i <= 6; i++) {
      expect(
        screen.getByText(`Purok ${i}`)
      ).toBeInTheDocument();
    }

    expect(
      screen.getAllByText("- 0")
    ).toHaveLength(6);
  });

  it("should render default puroks when an incomplete purok list is provided", () => {
    // Arrange
    render(
      <AdminPerPurokConsumptionCard
        puroks={[
          {
            name: "Purok 1",
            value: "1000",
          },
        ]}
      />
    );

    // Assert
    expect(
      screen.getAllByText("- 0")
    ).toHaveLength(6);
  });
});