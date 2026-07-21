  import { render, screen } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import { describe, expect, it, vi } from "vitest";
  import PaymentForm from "../../components/PaymentForm";

  describe("PaymentForm", () => {
    it("should render Consumer Name input", () => {
      render(<PaymentForm />);

      expect(
        screen.getByPlaceholderText("Consumer Name")
      ).toBeInTheDocument();
    });

    it("should render Current Balance input", () => {
      render(<PaymentForm />);

      expect(
        screen.getByPlaceholderText("Current Balance")
      ).toBeInTheDocument();
    });

    it("should render Amount Paid input", () => {
      render(<PaymentForm />);

      expect(
        screen.getByPlaceholderText("Amount Paid")
      ).toBeInTheDocument();
    });

    it("should render Payment Date input", () => {
      render(<PaymentForm />);

      expect(
        screen.getByLabelText(/Payment Date/i)
      ).toBeInTheDocument();
    });

    it("should render Payment Method input", () => {
      render(<PaymentForm />);

      expect(
        screen.getByPlaceholderText("Payment Method")
      ).toBeInTheDocument();
    });

    it("should render Record Payment button", () => {
      render(<PaymentForm />);

      expect(
        screen.getByRole("button", {
          name: /record payment/i,
        })
      ).toBeInTheDocument();
    });

    it("should display validation errors when submitted empty", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      await user.click(
        screen.getByRole("button", {
          name: /record payment/i,
        })
      );

      expect(
        screen.getByText(/Consumer Name is required/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Current Balance is required/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Amount Paid is required/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Payment Date is required/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Payment Method is required/i)
      ).toBeInTheDocument();
    });

    it("should allow typing consumer name", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      const input =
        screen.getByPlaceholderText("Consumer Name");

      await user.type(input, "Juan Dela Cruz");

      expect(input).toHaveValue("Juan Dela Cruz");
    });

    it("should calculate remaining balance correctly", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "300"
      );

      expect(
        screen.getByText(/700/)
      ).toBeInTheDocument();
    });

    it("should mark payment as Paid when fully paid", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "1000"
      );

      expect(
        screen.getByText(/^Paid$/)
      ).toBeInTheDocument();
    });

    it("should reject payment greater than balance", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      await user.type(
        screen.getByPlaceholderText("Consumer Name"),
        "Juan"
      );

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "1200"
      );

      await user.type(
        screen.getByLabelText(/Payment Date/i),
        "2026-06-30"
      );

      await user.type(
        screen.getByPlaceholderText("Payment Method"),
        "Cash"
      );

      await user.click(
        screen.getByRole("button", {
          name: /record payment/i,
        })
      );

      expect(
        screen.getByText(
          /Amount Paid cannot exceed balance/i
        )
      ).toBeInTheDocument();
    });

    it("should reject zero payment", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      await user.type(
        screen.getByPlaceholderText("Consumer Name"),
        "Juan"
      );

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "0"
      );

      await user.click(
        screen.getByRole("button", {
          name: /record payment/i,
        })
      );

      expect(
        screen.getByText(
          /greater than zero/i
        )
      ).toBeInTheDocument();
    });

    it("should call onSubmit when payment is valid", async () => {
      const user = userEvent.setup();

      const onSubmit = vi.fn();

      render(<PaymentForm onSubmit={onSubmit} />);

      await user.type(
        screen.getByPlaceholderText("Consumer Name"),
        "Juan Dela Cruz"
      );

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "500"
      );

      await user.type(
        screen.getByLabelText(/Payment Date/i),
        "2026-06-30"
      );

      await user.type(
        screen.getByPlaceholderText("Payment Method"),
        "Cash"
      );

      await user.click(
        screen.getByRole("button", {
          name: /record payment/i,
        })
      );

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("should reset the form after successful payment", async () => {
      const user = userEvent.setup();

      const onSubmit = vi.fn();

      render(<PaymentForm onSubmit={onSubmit} />);

      const consumer =
        screen.getByPlaceholderText("Consumer Name");

      await user.type(consumer, "Juan");

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "1000"
      );

      await user.type(
        screen.getByLabelText(/Payment Date/i),
        "2026-06-30"
      );

      await user.type(
        screen.getByPlaceholderText("Payment Method"),
        "Cash"
      );

      await user.click(
        screen.getByRole("button", {
          name: /record payment/i,
        })
      );

      expect(consumer).toHaveValue("");
    });
    
    it("should mark payment as Partially Paid when partially paid", async () => {
      const user = userEvent.setup();

      render(<PaymentForm />);

      await user.type(
        screen.getByPlaceholderText("Current Balance"),
        "1000"
      );

      await user.type(
        screen.getByPlaceholderText("Amount Paid"),
        "400"
      );

      expect(
        screen.getByText(/^Partially Paid$/)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/600/)
      ).toBeInTheDocument();
    });
  });
