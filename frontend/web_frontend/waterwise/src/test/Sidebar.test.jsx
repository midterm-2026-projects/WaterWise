import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "../components/Sidebar";

describe("Sidebar Testing", () => {
  const items = [
    "Dashboard",
    "Residents",
    "Meter Reading",
    "Billing",
    "Analytics",
  ];

  it.each(items)(
    "should render sidebar item %s",
    (item) => {
      // Arrange
      render(<Sidebar items={items} />);

      // Act
      const result = screen.getByText(item);

      // Assert
      expect(result).toBeInTheDocument();
    }
  );
});