import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ConsumerListTable from "../../components/ConsumerListTable";

const consumers = [
  {
    id: 1,
    accountName: "ACC-001",
    fullName: "Juan Dela Cruz",
    contactNumber: "09123456789",
    purok: "Purok 1",
    email: "juan@email.com",
    paymentStatus: "Paid",
  },
];

describe("ConsumerListTable", () => {
  it("should render Account Name header", () => {
    render(<ConsumerListTable />);

    expect(
      screen.getByText("Account Name")
    ).toBeInTheDocument();
  });

  it("should render Full Name header", () => {
    render(<ConsumerListTable />);

    expect(
      screen.getByText("Full Name")
    ).toBeInTheDocument();
  });

  it("should render Contact Number header", () => {
    render(<ConsumerListTable />);

    expect(
      screen.getByText("Contact Number")
    ).toBeInTheDocument();
  });

  it("should render Purok header", () => {
    render(<ConsumerListTable />);

    expect(
      screen.getByText("Purok")
    ).toBeInTheDocument();
  });

  it("should render Email Address header", () => {
    render(<ConsumerListTable />);

    expect(
      screen.getByText("Email Address")
    ).toBeInTheDocument();
  });

  it("should render Payment Status header", () => {
    render(<ConsumerListTable />);

    expect(
      screen.getByText("Payment Status")
    ).toBeInTheDocument();
  });

  it("should display consumer information", () => {
    render(
      <ConsumerListTable consumers={consumers} />
    );

    expect(
      screen.getByText("ACC-001")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Juan Dela Cruz")
    ).toBeInTheDocument();

    expect(
      screen.getByText("09123456789")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("juan@email.com")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Paid")
    ).toBeInTheDocument();
  });

  it("should render View button", () => {
    render(
      <ConsumerListTable consumers={consumers} />
    );

    expect(
      screen.getByRole("button", { name: /view/i })
    ).toBeInTheDocument();
  });

  it("should render Edit button", () => {
    render(
      <ConsumerListTable consumers={consumers} />
    );

    expect(
      screen.getByRole("button", { name: /edit/i })
    ).toBeInTheDocument();
  });

  it("should call onView when View button is clicked", async () => {
    const user = userEvent.setup();

    const onView = vi.fn();

    render(
      <ConsumerListTable
        consumers={consumers}
        onView={onView}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /view/i })
    );

    expect(onView).toHaveBeenCalledTimes(1);

    expect(onView).toHaveBeenCalledWith(
      consumers[0]
    );
  });

  it("should call onEdit when Edit button is clicked", async () => {
    const user = userEvent.setup();

    const onEdit = vi.fn();

    render(
      <ConsumerListTable
        consumers={consumers}
        onEdit={onEdit}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /edit/i })
    );

    expect(onEdit).toHaveBeenCalledTimes(1);

    expect(onEdit).toHaveBeenCalledWith(
      consumers[0]
    );
  });

  it("should display empty state when no consumers exist", () => {
    render(
      <ConsumerListTable consumers={[]} />
    );

    expect(
      screen.getByText(/No consumers found/i)
    ).toBeInTheDocument();
  });
});