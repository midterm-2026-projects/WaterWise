import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ConsumerProfile from "../../pages/ConsumerProfile";

const baseConsumer = {
  accountId: "ACC-9001",
  name: "Maria Santos",
  purok: "Purok 2",
  houseNumber: "8-A",
  email: "maria@sucol.local",
  contactNumber: "0917 111 2222",
  meterNumber: "SWS-MTR-9001",
  status: "Active",
  activeAmountDue: 780,
  dueDate: "August 15, 2026",
  latestMonth: "July 2026",
  volumetricUsage: 31.2,
  previousReading: 300,
  currentReading: 331.2,
  lastReadingDate: "2026-07-31",
};

describe("ConsumerProfile inter-component page", () => {
  it("renders the retained profile, balance, and usage widgets inside the page", () => {
    render(React.createElement(ConsumerProfile, { consumer: baseConsumer }));

    expect(screen.getByTestId("info-name")).toHaveTextContent("Maria Santos");
    expect(screen.getByTestId("info-purok")).toHaveTextContent("Purok 2");
    expect(screen.getByTestId("balance-amount")).toHaveTextContent("780.00");
    expect(screen.getByTestId("consumption-month")).toHaveTextContent("July 2026");
    expect(screen.getByTestId("consumption-usage")).toHaveTextContent("31.2");
    expect(screen.getByText("Consumer read-only boundary")).toBeInTheDocument();
  });

  it("updates consumer details and meter-difference display when new data arrives", () => {
    const { rerender } = render(
      React.createElement(ConsumerProfile, { consumer: baseConsumer }),
    );

    rerender(
      React.createElement(ConsumerProfile, {
        consumer: {
          ...baseConsumer,
          name: "Juan Dela Cruz",
          purok: "Purok 5",
          activeAmountDue: 0,
          latestMonth: "August 2026",
          volumetricUsage: 18.4,
          previousReading: 331.2,
          currentReading: 349.6,
        },
      }),
    );

    expect(screen.getByTestId("info-name")).toHaveTextContent("Juan Dela Cruz");
    expect(screen.getByTestId("info-purok")).toHaveTextContent("Purok 5");
    expect(screen.getByTestId("balance-amount")).toHaveTextContent("0.00");
    expect(screen.getByTestId("consumption-month")).toHaveTextContent("August 2026");
    expect(screen.getByTestId("consumption-usage")).toHaveTextContent("18.4");
  });
});
