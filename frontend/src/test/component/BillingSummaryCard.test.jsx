import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import BillingSummaryCard from "../../components/BillingSummaryCard";

describe("BillingSummaryCard", () => {
  const billingData = [
    {
      invoiceNumber: "INV-001",
      amountDue: 500,
      status: "Paid",
    },
    {
      invoiceNumber: "INV-002",
      amountDue: 400,
      status: "Unpaid",
    },
    {
      invoiceNumber: "INV-003",
      amountDue: 300,
      status: "Partially Paid",
    },
    {
      invoiceNumber: "INV-004",
      amountDue: 200,
      status: "Paid",
    },
  ];

  it("should render all summary cards", () => {
    render(
      <BillingSummaryCard billingData={billingData} />
    );

    expect(
      screen.getByText("Total Bills")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Paid Bills")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Partially Paid")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Unpaid Bills")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Total Billing")
    ).toBeInTheDocument();
  });

  it("should display the correct total number of bills", () => {
    render(
      <BillingSummaryCard billingData={billingData} />
    );

    expect(
      screen.getByTestId("total-bills-value")
    ).toHaveTextContent("4");
  });

  it("should display the correct number of paid bills", () => {
    render(
      <BillingSummaryCard billingData={billingData} />
    );

    expect(
      screen.getByTestId("paid-bills-value")
    ).toHaveTextContent("2");
  });

  it("should display the correct number of partially paid bills", () => {
    render(
      <BillingSummaryCard billingData={billingData} />
    );

    expect(
      screen.getByTestId("partially-paid-value")
    ).toHaveTextContent("1");
  });

  it("should display the correct number of unpaid bills", () => {
    render(
      <BillingSummaryCard billingData={billingData} />
    );

    expect(
      screen.getByTestId("unpaid-bills-value")
    ).toHaveTextContent("1");
  });

  it("should display the total billing amount", () => {
    render(
      <BillingSummaryCard billingData={billingData} />
    );

    expect(
      screen.getByTestId("total-billing-value")
    ).toHaveTextContent("₱1,400.00");
  });
});