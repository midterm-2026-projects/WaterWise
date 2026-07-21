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

import MeterReadingTable from "../../components/MeterReadingTable";

describe("MeterReadingTable", () => {
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  const readings = [
    {
      id: 1,
      consumerNo: "C-1001",
      consumerName: "Juan Dela Cruz",
      purok: "Purok 1",
      previousReading: 120,
      currentReading: 135,
      consumption: 15,
      readingDate: "2026-07-01",
      status: "Recorded",
    },
    {
      id: 2,
      consumerNo: "C-1002",
      consumerName: "Maria Santos",
      purok: "Purok 2",
      previousReading: 98,
      currentReading: 111,
      consumption: 13,
      readingDate: "2026-07-01",
      status: "Recorded",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(
    "should display all meter reading records",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Assert
      expect(
        screen.getByRole("table")
      ).toBeInTheDocument();

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

      expect(
        screen.getByText(
          "C-1001"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "C-1002"
        )
      ).toBeInTheDocument();
    }
  );

  it(
    "should display all column headers",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Assert
      expect(
        screen.getByText(
          "Consumer No."
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Consumer Name"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Purok"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Previous"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Current"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Consumption"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Reading Date"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Status"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Actions"
        )
      ).toBeInTheDocument();
    }
  );

  it(
    "should display the empty state when there are no records",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={[]}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Assert
      expect(
        screen.getByText(
          "No meter reading records found."
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("table")
      ).not.toBeInTheDocument();
    }
  );

  it(
    "should call onEdit when Edit button is clicked",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

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
        onEdit
      ).toHaveBeenCalledTimes(1);

      expect(
        onEdit
      ).toHaveBeenCalledWith(
        readings[0]
      );
    }
  );

  it(
    "should call onDelete when Delete button is clicked",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

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
        onDelete
      ).toHaveBeenCalledTimes(1);

      expect(
        onDelete
      ).toHaveBeenCalledWith(
        readings[0].id
      );
    }
  );

  it(
    "should render one edit button for each record",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Assert
      expect(
        screen.getAllByRole(
          "button",
          {
            name: /edit/i,
          }
        )
      ).toHaveLength(
        readings.length
      );
    }
  );

  it(
    "should render one delete button for each record",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Assert
      expect(
        screen.getAllByRole(
          "button",
          {
            name: /delete/i,
          }
        )
      ).toHaveLength(
        readings.length
      );
    }
  );

  it(
    "should display the status badge for each record",
    () => {
      // Arrange
      render(
        <MeterReadingTable
          readings={readings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Assert
      expect(
        screen.getAllByText(
          "Recorded"
        )
      ).toHaveLength(2);
    }
  );
});