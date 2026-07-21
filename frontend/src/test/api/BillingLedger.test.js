import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BillingLedger from "../../pages/BillingLedger";
import { fetchBillingLedger } from "../../services/consumerPortal.service";

vi.mock("../../services/consumerPortal.service", () => ({
  fetchBillingLedger: vi.fn(),
}));

describe("BillingLedger API display", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the billing ledger retrieved from the API", async () => {
    fetchBillingLedger.mockResolvedValue({
      ledgerAccount: {
        accountId: "ACC-77",
        name: "Ana Reyes",
        outstandingBalance: 350,
        dueDate: "July 15, 2026",
      },
      historyData: [
        {
          invoiceNumber: "INV-2026-001",
          billingPeriod: "June 2026",
          readingDate: "2026-06-30",
          cubicMetersConsumed: 24,
          amountDue: 640,
          remainingBalance: 350,
          status: "Unpaid",
          previousReading: 100,
          currentReading: 124,
        },
      ],
      officialReceipt: {
        meterName: "SWS-MTR-0077",
        runDate: "June 30, 2026",
        previousReading: 100,
        presentReading: 124,
        baselineBill: 640,
        arrears30Days: 0,
        arrears60Days: 0,
        arrears90Days: 0,
      },
    });

    render(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/consumer/billing-ledger"] },
        React.createElement(BillingLedger),
      ),
    );

    expect(screen.getByRole("status")).toHaveTextContent("Loading billing ledger");
    expect(await screen.findByTestId("outstanding-balance")).toHaveTextContent(
      "350.00",
    );
    expect(screen.getByTestId("due-date")).toHaveTextContent("July 15, 2026");
    expect(screen.getByTestId("row-month")).toHaveTextContent("June 2026");
    expect(screen.getByTestId("row-consumption")).toHaveTextContent("24");
    expect(screen.getByTestId("row-amount-due")).toHaveTextContent("640.00");
    expect(fetchBillingLedger).toHaveBeenCalledOnce();
  });
});
