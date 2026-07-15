import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import BillingManagement from "../components/BillingManagement";

describe("BillingManagement", () => {
  it("should render the Billing Management heading", () => {
    // Arrange
    render(<BillingManagement />);

    // Assert
    expect(
      screen.getByRole("heading", {
        name: /Billing Management/i,
      })
    ).toBeInTheDocument();
  });

  it("should render Billing Summary Card", () => {
    // Arrange
    render(<BillingManagement />);

    // Assert
    expect(
      screen.getByTestId("total-bills-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("paid-bills-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("partially-paid-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("unpaid-bills-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("total-billing-card")
    ).toBeInTheDocument();
  });

  it("should render Billing History Table", () => {
    // Arrange
    render(<BillingManagement />);

    // Assert
    expect(
      screen.getByTestId(
        "billing-history-table"
      )
    ).toBeInTheDocument();
  });

  it("should render Payment Form", () => {
    // Arrange
    render(<BillingManagement />);

    // Assert
    expect(
      screen.getByRole("button", {
        name: /record payment/i,
      })
    ).toBeInTheDocument();
  });

  it("should display all billing records", () => {
    // Arrange
    render(<BillingManagement />);

    // Assert
    expect(
      screen.getAllByTestId(
        "history-row"
      )
    ).toHaveLength(5);
  });

  it("should display receipt details after selecting a receipt", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<BillingManagement />);

    // Act
    const buttons =
      screen.getAllByRole("button", {
        name: /view receipt/i,
      });

    await user.click(buttons[0]);

    // Assert
    expect(
      screen.getByTestId(
        "receipt-details"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "receipt-invoice"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "receipt-period"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "receipt-reading-date"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "receipt-consumption"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "receipt-amount"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "receipt-status"
      )
    ).toBeInTheDocument();
  });

  it("should allow submitting a payment form", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<BillingManagement />);

    // Act
    await user.type(
      screen.getByPlaceholderText(
        "Consumer Name"
      ),
      "Pedro Reyes"
    );

    await user.type(
      screen.getByPlaceholderText(
        "Current Balance"
      ),
      "1250"
    );

    await user.type(
      screen.getByPlaceholderText(
        "Amount Paid"
      ),
      "1250"
    );

    await user.type(
      screen.getByLabelText(
        /Payment Date/i
      ),
      "2026-06-30"
    );

    await user.type(
      screen.getByPlaceholderText(
        "Payment Method"
      ),
      "Cash"
    );

    await user.click(
      screen.getByRole("button", {
        name: /record payment/i,
      })
    );

    // Assert
    expect(
      screen.getByRole("button", {
        name: /record payment/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "billing-history-table"
      )
    ).toBeInTheDocument();
  });
});
