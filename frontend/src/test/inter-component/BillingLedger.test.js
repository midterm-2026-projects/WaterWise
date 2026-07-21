import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import BillingLedger from "../../pages/BillingLedger";

const ledgerAccount = {
  accountId: "ACC-7777",
  name: "Ana Reyes",
  outstandingBalance: 820,
  dueDate: "August 20, 2026",
};

const historyData = [
  {
    invoiceNumber: "INV-PAID-001",
    name: "Ana Reyes",
    billingPeriod: "July 2026",
    readingDate: "2026-07-31",
    cubicMetersConsumed: 20,
    amountDue: 500,
    status: "Paid",
    previousReading: 100,
    currentReading: 120,
  },
  {
    invoiceNumber: "INV-OVERDUE-001",
    name: "Ana Reyes",
    billingPeriod: "August 2026",
    readingDate: "2026-08-31",
    cubicMetersConsumed: 22,
    amountDue: 620,
    status: "Overdue",
    previousReading: 120,
    currentReading: 142,
  },
];

const officialReceipt = {
  meterName: "SWS-MTR-7777",
  runDate: "August 31, 2026",
  previousReading: 120,
  presentReading: 142,
  baselineBill: 620,
  arrears30Days: 0,
  arrears60Days: 0,
  arrears90Days: 0,
};

function renderLedger(props = {}, initialEntries = ["/consumer/billing-ledger"]) {
  return render(
    React.createElement(
      MemoryRouter,
      { initialEntries },
      React.createElement(BillingLedger, {
        historyData,
        ledgerAccount,
        officialReceipt,
        ...props,
      }),
    ),
  );
}

describe("BillingLedger inter-component page", () => {
  it("renders current billing, history table, and opens digital receipts only for paid rows", () => {
    renderLedger();

    expect(screen.getByTestId("current-billing-card")).toBeInTheDocument();
    expect(screen.getByTestId("outstanding-balance")).toHaveTextContent("820.00");
    expect(screen.getByTestId("billing-history-table")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("view-receipt-INV-PAID-001"));
    expect(screen.getByTestId("receipt-invoice")).toHaveTextContent("INV-PAID-001");

    fireEvent.click(screen.getByTestId("close-modal-btn"));
    expect(screen.queryByTestId("receipt-invoice")).not.toBeInTheDocument();

    expect(screen.getByTestId("view-receipt-INV-OVERDUE-001")).toBeDisabled();
  });

  it("opens the official receipt when the notification route query is present", () => {
    renderLedger({}, ["/consumer/billing-ledger?receipt=official"]);

    expect(screen.getByText("Sucol Water System Official Receipt")).toBeInTheDocument();
    expect(screen.getByTestId("receipt-meter-name")).toHaveTextContent("SWS-MTR-7777");
  });

  it("updates billing totals and rows when new ledger data arrives", () => {
    const { rerender } = renderLedger();

    rerender(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/consumer/billing-ledger"] },
        React.createElement(BillingLedger, {
          ledgerAccount: {
            ...ledgerAccount,
            outstandingBalance: 100,
            dueDate: "September 15, 2026",
          },
          historyData: [
            {
              ...historyData[0],
              invoiceNumber: "INV-NEW-001",
              billingPeriod: "September 2026",
              amountDue: 100,
            },
          ],
          officialReceipt,
        }),
      ),
    );

    expect(screen.getByTestId("outstanding-balance")).toHaveTextContent("100.00");
    expect(screen.getByTestId("due-date")).toHaveTextContent("September 15, 2026");
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });
});
