import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ConsumerProfile from "../../pages/ConsumerProfile";
import { fetchConsumerProfile } from "../../services/consumerPortal.service";

vi.mock("../../services/consumerPortal.service", () => ({
  fetchConsumerProfile: vi.fn(),
}));

describe("ConsumerProfile API display", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the consumer profile retrieved from the API", async () => {
    fetchConsumerProfile.mockResolvedValue({
      accountId: "ACC-9001",
      name: "Maria Santos",
      purok: "Purok 2",
      houseNumber: "8-A",
      email: "maria@sucol.local",
      contactNumber: "0917 111 2222",
      meterNumber: "SWS-MTR-9001",
      status: "active",
      activeAmountDue: 780,
      dueDate: "August 15, 2026",
      latestMonth: "July 2026",
      volumetricUsage: 31.2,
      previousReading: 300,
      currentReading: 331.2,
      lastReadingDate: "2026-07-31",
    });

    render(React.createElement(ConsumerProfile));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading consumer profile",
    );
    expect(await screen.findByTestId("info-name")).toHaveTextContent(
      "Maria Santos",
    );
    expect(screen.getByTestId("info-purok")).toHaveTextContent("Purok 2");
    expect(screen.getByTestId("balance-amount")).toHaveTextContent("780.00");
    expect(screen.getByTestId("consumption-month")).toHaveTextContent(
      "July 2026",
    );
    expect(screen.getByText("maria@sucol.local")).toBeInTheDocument();
    expect(screen.getByText("SWS-MTR-9001")).toBeInTheDocument();
    expect(fetchConsumerProfile).toHaveBeenCalledOnce();
  });
});
