import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import MeterReadingForm from "../components/MeterReadingForm";

describe("MeterReadingForm", () => {
  const onSave = vi.fn();
  const onCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the create meter reading form", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={null}
      />
    );

    // Assert
    expect(
      screen.getByText(
        "Create Meter Reading"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Consumer Number"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Consumer Name"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Purok"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Previous Reading"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Current Reading"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /save/i,
      })
    ).toBeInTheDocument();
  });

  it("should display validation errors for empty fields", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={null}
      />
    );

    // Act
    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      })
    );

    // Assert
    expect(
      screen.getByText(
        "Consumer number is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Consumer name is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Purok is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Previous reading is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Current reading is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Reading date is required."
      )
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("should calculate consumption automatically", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={null}
      />
    );

    // Act
    fireEvent.change(
      screen.getByLabelText(
        "Previous Reading"
      ),
      {
        target: {
          value: "100",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Current Reading"
      ),
      {
        target: {
          value: "125",
        },
      }
    );

    // Assert
    expect(
      screen.getByDisplayValue(25)
    ).toBeInTheDocument();
  });

  it("should not allow current reading lower than previous reading", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={null}
      />
    );

    fireEvent.change(
      screen.getByLabelText(
        "Consumer Number"
      ),
      {
        target: {
          value: "C-1001",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Consumer Name"
      ),
      {
        target: {
          value: "Juan",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Purok"
      ),
      {
        target: {
          value: "Purok 1",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Previous Reading"
      ),
      {
        target: {
          value: "120",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Current Reading"
      ),
      {
        target: {
          value: "100",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Reading Date"
      ),
      {
        target: {
          value: "2026-07-15",
        },
      }
    );

    // Act
    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      })
    );

    // Assert
    expect(
      screen.getByText(
        "Current reading must be greater than or equal to previous reading."
      )
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("should save a valid meter reading", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={null}
      />
    );

    fireEvent.change(
      screen.getByLabelText(
        "Consumer Number"
      ),
      {
        target: {
          value: "C-1006",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Consumer Name"
      ),
      {
        target: {
          value: "Pedro",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Purok"
      ),
      {
        target: {
          value: "Purok 3",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Previous Reading"
      ),
      {
        target: {
          value: "200",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Current Reading"
      ),
      {
        target: {
          value: "225",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(
        "Reading Date"
      ),
      {
        target: {
          value: "2026-07-15",
        },
      }
    );

    // Act
    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      })
    );

    // Assert
    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        consumerNo: "C-1006",
        consumerName: "Pedro",
        purok: "Purok 3",
        previousReading: 200,
        currentReading: 225,
        consumption: 25,
      })
    );
  });

  it("should display edit mode correctly", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={{
          id: 1,
          consumerNo: "C-1001",
          consumerName: "Juan",
          purok: "Purok 1",
          previousReading: 100,
          currentReading: 120,
          readingDate: "2026-07-01",
          status: "Recorded",
        }}
      />
    );

    // Assert
    expect(
      screen.getByText(
        "Edit Meter Reading"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(
        "Juan"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /update/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    ).toBeInTheDocument();
  });

  it("should call onCancel when cancel button is clicked", () => {
    // Arrange
    render(
      <MeterReadingForm
        onSave={onSave}
        onCancel={onCancel}
        selectedReading={{
          id: 1,
          consumerNo: "C-1001",
          consumerName: "Juan",
          purok: "Purok 1",
          previousReading: 100,
          currentReading: 120,
          readingDate: "2026-07-01",
          status: "Recorded",
        }}
      />
    );

    // Act
    fireEvent.click(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    );

    // Assert
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});