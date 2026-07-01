import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import AnalyticsFilter from "../components/AnalyticsFilter";

describe("Analytics Filter", () => {
  it("should display the Overall Monthly Consumption Trend when Overall and Monthly are selected", () => {
    // Arrange
    render(<AnalyticsFilter />);

    // Assert
    expect(screen.getByText("Jan - 10150 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 10820 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 11240 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 11780 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 12030 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 12450 m³")).toBeInTheDocument();
  });

  it("should display the Overall Yearly Consumption Trend when Overall and Yearly are selected", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<AnalyticsFilter />);

    // Act
    await user.click(
      screen.getByRole("button", {
        name: "Yearly",
      })
    );

    // Assert
    expect(screen.getByText("2021 - 70120 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 74850 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 79210 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 83540 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 86420 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 89320 m³")).toBeInTheDocument();
  });

  it("should display the Purok 1-6 historical and predicted monthly consumption graphs when All Puroks and Monthly are selected", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<AnalyticsFilter />);

    // Act
    await user.click(
      screen.getByRole("button", {
        name: "All Puroks",
      })
    );

    // Assert

    // Purok 1
    expect(screen.getByText("Jan - 4200 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4450 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4680 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4820 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 5010 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 5200 m³")).toBeInTheDocument();

    // Purok 2
    expect(screen.getByText("Jan - 3900 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4020 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4200 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4380 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4550 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 4800 m³")).toBeInTheDocument();

    // Purok 3
    expect(screen.getByText("Jan - 4500 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4680 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4900 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 5120 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 5350 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 6100 m³")).toBeInTheDocument();

    // Purok 4
    expect(screen.getByText("Jan - 3700 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 3820 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 3960 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4100 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4250 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 4300 m³")).toBeInTheDocument();

    // Purok 5
    expect(screen.getByText("Jan - 4100 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4250 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4420 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4600 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4790 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 5600 m³")).toBeInTheDocument();

    // Purok 6
    expect(screen.getByText("Jan - 4000 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4130 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4280 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4410 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4580 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 4900 m³")).toBeInTheDocument();
  });

  it("should display the Purok 1-6 historical and predicted yearly consumption graphs when All Puroks and Yearly are selected", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<AnalyticsFilter />);

    // Act
    await user.click(
      screen.getByRole("button", {
        name: "All Puroks",
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Yearly",
      })
    );

    // Assert

    // Purok 1
    expect(screen.getByText("2021 - 48500 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 51200 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 54800 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 57100 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 59800 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 62400 m³")).toBeInTheDocument();

    // Purok 2
    expect(screen.getByText("2021 - 45200 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 47000 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 49600 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 52100 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 54800 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 57600 m³")).toBeInTheDocument();

    // Purok 3
    expect(screen.getByText("2021 - 53800 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 56600 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 59400 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 62100 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 64900 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 68400 m³")).toBeInTheDocument();

    // Purok 4
    expect(screen.getByText("2021 - 43200 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 44600 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 46200 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 47800 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 49500 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 51200 m³")).toBeInTheDocument();

    // Purok 5
    expect(screen.getByText("2021 - 46800 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 49100 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 51500 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 53900 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 56300 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 59100 m³")).toBeInTheDocument();

    // Purok 6
    expect(screen.getByText("2021 - 45600 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 47200 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 48900 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 50700 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 52600 m³")).toBeInTheDocument();
    expect(screen.getByText("2026 - 54800 m³")).toBeInTheDocument();
  });

  it("should display a default message when Overall Monthly has no data", () => {
  // Arrange
  render(
    <AnalyticsFilter
      monthlyData={[]}
    />
  );

  // Assert
  expect(
    screen.getByText(
      "No monthly consumption data available."
    )
  ).toBeInTheDocument();
});

it("should display a default message when Overall Yearly has no data", async () => {
  // Arrange
  const user = userEvent.setup();

  render(
    <AnalyticsFilter
      yearlyData={[]}
    />
  );

  // Act
  await user.click(
    screen.getByRole("button", {
      name: "Yearly",
    })
  );

  // Assert
  expect(
    screen.getByText(
      "No yearly consumption data available."
    )
  ).toBeInTheDocument();
});

it("should display a default message when All Puroks Monthly has no data", async () => {
  // Arrange
  const user = userEvent.setup();

  render(
    <AnalyticsFilter
      purokData={{}}
    />
  );

  // Act
  await user.click(
    screen.getByRole("button", {
      name: "All Puroks",
    })
  );

  // Assert
  expect(
    screen.getByText(
      "No purok consumption data available."
    )
  ).toBeInTheDocument();
});

it("should display a default message when All Puroks Yearly has no data", async () => {
  // Arrange
  const user = userEvent.setup();

  render(
    <AnalyticsFilter
      purokData={{}}
    />
  );

  // Act
  await user.click(
    screen.getByRole("button", {
      name: "All Puroks",
    })
  );

  await user.click(
    screen.getByRole("button", {
      name: "Yearly",
    })
  );

  // Assert
  expect(
    screen.getByText(
      "No purok consumption data available."
    )
  ).toBeInTheDocument();
});
});

