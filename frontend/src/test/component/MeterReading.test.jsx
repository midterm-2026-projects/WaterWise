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

import MeterReading from "../../components/MeterReading";

describe("MeterReading", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(window, "confirm")
      .mockReturnValue(true);

    vi.spyOn(window, "scrollTo")
      .mockImplementation(() => {});
  });

  it(
    "should display the meter reading management page",
    () => {
      // Arrange
      render(<MeterReading />);

      // Assert
      expect(
        screen.getByText(
          "Meter Reading Management"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole("table")
      ).toBeInTheDocument();
    }
  );

  it(
    "should display the default meter reading records",
    () => {
      // Arrange
      render(<MeterReading />);

      // Assert
      expect(
        screen.getByText(
          "Juan Dela Cruz"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Maria Santos"
        )
      ).toBeInTheDocument();
    }
  );

  it(
    "should add a new meter reading",
    () => {
      // Arrange
      render(<MeterReading />);

      fireEvent.change(
        screen.getByLabelText(
          "Consumer Number"
        ),
        {
          target: {
            value: "C-9999",
          },
        }
      );

      fireEvent.change(
        screen.getByLabelText(
          "Consumer Name"
        ),
        {
          target: {
            value:
              "Test Consumer",
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

      fireEvent.change(
        screen.getByLabelText(
          "Reading Date"
        ),
        {
          target: {
            value:
              "2026-07-15",
          },
        }
      );

      // Act
      fireEvent.click(
        screen.getByRole(
          "button",
          {
            name: /save/i,
          }
        )
      );

      // Assert
      expect(
        screen
          .getAllByText(
            "Test Consumer"
          )
          .length
      ).toBeGreaterThan(0);
    }
  );

  it(
    "should update an existing meter reading",
    () => {
      // Arrange
      render(<MeterReading />);

      fireEvent.click(
        screen.getAllByRole(
          "button",
          {
            name: /edit/i,
          }
        )[0]
      );

      // Act
      fireEvent.change(
        screen.getByLabelText(
          "Consumer Name"
        ),
        {
          target: {
            value:
              "Updated Consumer",
          },
        }
      );

      fireEvent.click(
        screen.getByRole(
          "button",
          {
            name: /update/i,
          }
        )
      );

      // Assert
      expect(
        screen
          .getAllByText(
            "Updated Consumer"
          )
          .length
      ).toBeGreaterThan(0);
    }
  );

  it(
    "should delete a meter reading",
    () => {
      // Arrange
      render(<MeterReading />);

      expect(
        screen.getByText(
          "Juan Dela Cruz"
        )
      ).toBeInTheDocument();

      // Act
      fireEvent.click(
        screen.getAllByRole(
          "button",
          {
            name: /delete/i,
          }
        )[0]
      );

      // Assert
      expect(
        screen.queryByText(
          "Juan Dela Cruz"
        )
      ).not.toBeInTheDocument();
    }
  );

  it(
    "should cancel editing",
    () => {
      // Arrange
      render(<MeterReading />);

      fireEvent.click(
        screen.getAllByRole(
          "button",
          {
            name: /edit/i,
          }
        )[0]
      );

      // Act
      fireEvent.click(
        screen.getByRole(
          "button",
          {
            name: /cancel/i,
          }
        )
      );

      // Assert
      expect(
        screen.getByRole(
          "button",
          {
            name: /save/i,
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByRole(
          "button",
          {
            name: /update/i,
          }
        )
      ).not.toBeInTheDocument();
    }
  );

  it(
    "should calculate consumption automatically",
    () => {
      // Arrange
      render(<MeterReading />);

      // Act
      fireEvent.change(
        screen.getByLabelText(
          "Previous Reading"
        ),
        {
          target: {
            value: "50",
          },
        }
      );

      fireEvent.change(
        screen.getByLabelText(
          "Current Reading"
        ),
        {
          target: {
            value: "80",
          },
        }
      );

      // Assert
      expect(
        screen.getByDisplayValue(
          30
        )
      ).toBeInTheDocument();
    }
  );

  it(
    "should keep existing records after adding a new one",
    () => {
      // Arrange
      render(<MeterReading />);

      fireEvent.change(
        screen.getByLabelText(
          "Consumer Number"
        ),
        {
          target: {
            value: "C-1234",
          },
        }
      );

      fireEvent.change(
        screen.getByLabelText(
          "Consumer Name"
        ),
        {
          target: {
            value:
              "Another Consumer",
          },
        }
      );

      fireEvent.change(
        screen.getByLabelText(
          "Purok"
        ),
        {
          target: {
            value: "Purok 2",
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
            value: "230",
          },
        }
      );

      fireEvent.change(
        screen.getByLabelText(
          "Reading Date"
        ),
        {
          target: {
            value:
              "2026-07-20",
          },
        }
      );

      // Act
      fireEvent.click(
        screen.getByRole(
          "button",
          {
            name: /save/i,
          }
        )
      );

      // Assert
      expect(
        screen
          .getAllByText(
            "Another Consumer"
          )
          .length
      ).toBeGreaterThan(0);

      expect(
        screen.getByText(
          "Maria Santos"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Pedro Reyes"
        )
      ).toBeInTheDocument();
    }
  );

  it(
    "should enter edit mode when Edit is clicked",
    () => {
      // Arrange
      render(<MeterReading />);

      // Act
      fireEvent.click(
        screen.getAllByRole(
          "button",
          {
            name: /edit/i,
          }
        )[0]
      );

      // Assert
      expect(
        screen.getByRole(
          "button",
          {
            name: /update/i,
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole(
          "button",
          {
            name: /cancel/i,
          }
        )
      ).toBeInTheDocument();
    }
  );
});