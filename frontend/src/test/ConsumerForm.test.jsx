import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ConsumerForm from "../components/ConsumerForm";

describe("ConsumerForm", () => {
  it("should render all input fields", () => {
    // Arrange
    render(<ConsumerForm />);

    // Assert
    expect(screen.getByLabelText(/Account Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Purok/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save consumer/i })
    ).toBeInTheDocument();
  });

  it("should allow typing in all fields", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<ConsumerForm />);

    // Act
    await user.type(
      screen.getByLabelText(/Account Name/i),
      "ACC-001"
    );

    await user.type(
      screen.getByLabelText(/Full Name/i),
      "Juan Dela Cruz"
    );

    await user.type(
      screen.getByLabelText(/Contact Number/i),
      "09123456789"
    );

    await user.selectOptions(
      screen.getByLabelText(/Purok/i),
      "Purok 2"
    );

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "juan@email.com"
    );

    // Assert
    expect(
      screen.getByLabelText(/Account Name/i)
    ).toHaveValue("ACC-001");

    expect(
      screen.getByLabelText(/Full Name/i)
    ).toHaveValue("Juan Dela Cruz");

    expect(
      screen.getByLabelText(/Contact Number/i)
    ).toHaveValue("09123456789");

    expect(
      screen.getByLabelText(/Purok/i)
    ).toHaveValue("Purok 2");

    expect(
      screen.getByLabelText(/Email Address/i)
    ).toHaveValue("juan@email.com");
  });

  it("should display validation errors when submitted empty", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<ConsumerForm />);

    // Act
    await user.click(
      screen.getByRole("button", {
        name: /save consumer/i,
      })
    );

    // Assert
    expect(
      await screen.findByText("Account Name is required.")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Full Name is required.")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Contact Number is required.")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Purok is required.")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Email Address is required.")
    ).toBeInTheDocument();
  });

  it("should display invalid email error", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<ConsumerForm />);

    // Act
    await user.type(
      screen.getByLabelText(/Account Name/i),
      "ACC-001"
    );

    await user.type(
      screen.getByLabelText(/Full Name/i),
      "Juan Dela Cruz"
    );

    await user.type(
      screen.getByLabelText(/Contact Number/i),
      "09123456789"
    );

    await user.selectOptions(
      screen.getByLabelText(/Purok/i),
      "Purok 1"
    );

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "invalid-email"
    );

    await user.click(
      screen.getByRole("button", {
        name: /save consumer/i,
      })
    );

    // Assert
    expect(
      await screen.findByText("Invalid email address.")
    ).toBeInTheDocument();
  });

  it("should call onSubmit when all fields are valid", async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ConsumerForm onSubmit={onSubmit} />);

    // Act
    await user.type(
      screen.getByLabelText(/Account Name/i),
      "ACC-001"
    );

    await user.type(
      screen.getByLabelText(/Full Name/i),
      "Juan Dela Cruz"
    );

    await user.type(
      screen.getByLabelText(/Contact Number/i),
      "09123456789"
    );

    await user.selectOptions(
      screen.getByLabelText(/Purok/i),
      "Purok 3"
    );

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "juan@email.com"
    );

    await user.click(
      screen.getByRole("button", {
        name: /save consumer/i,
      })
    );

    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith({
      accountName: "ACC-001",
      fullName: "Juan Dela Cruz",
      contactNumber: "09123456789",
      purok: "Purok 3",
      email: "juan@email.com",
    });
  });

  it("should clear the form after successful submission", async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ConsumerForm onSubmit={onSubmit} />);

    // Act
    await user.type(
      screen.getByLabelText(/Account Name/i),
      "ACC-001"
    );

    await user.type(
      screen.getByLabelText(/Full Name/i),
      "Juan Dela Cruz"
    );

    await user.type(
      screen.getByLabelText(/Contact Number/i),
      "09123456789"
    );

    await user.selectOptions(
      screen.getByLabelText(/Purok/i),
      "Purok 2"
    );

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "juan@email.com"
    );

    await user.click(
      screen.getByRole("button", {
        name: /save consumer/i,
      })
    );

    // Assert
    expect(
      screen.getByLabelText(/Account Name/i)
    ).toHaveValue("");

    expect(
      screen.getByLabelText(/Full Name/i)
    ).toHaveValue("");

    expect(
      screen.getByLabelText(/Contact Number/i)
    ).toHaveValue("");

    expect(
      screen.getByLabelText(/Purok/i)
    ).toHaveValue("");

    expect(
      screen.getByLabelText(/Email Address/i)
    ).toHaveValue("");
  });
});