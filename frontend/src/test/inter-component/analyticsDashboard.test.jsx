import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  MemoryRouter,
} from "react-router-dom";

import AnalyticsTitle from "../../components/AnalyticsTitle";

import AdminOverallConsumptionCard from "../../components/AdminOverallConsumptionCard";
import AdminMonthlyConsumptionCard from "../../components/AdminMonthlyConsumptionCard";
import AdminYearlyConsumptionCard from "../../components/AdminYearlyConsumptionCard";
import AdminPerPurokConsumptionCard from "../../components/AdminPerPurokConsumptionCard";

import AnomalyAlertCard from "../../components/AnomalyAlertCard";
import ConsumptionRankingSection from "../../components/ConsumptionRankingSection";

import MonthlyConsumptionTrend from "../../components/MonthlyConsumptionTrend";
import YearlyConsumptionTrend from "../../components/YearlyConsumptionTrend";
import PerPurokConsumptionTrend from "../../components/PerPurokConsumptionTrend";
import PurokComparisonChart from "../../components/PurokComparisonChart";

import RecommendationCard from "../../components/RecommendationCard";
import RecommendationSection from "../../components/RecommendationSection";

import Sidebar from "../../components/Sidebar";

const renderWithRouter = (
  component
) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe(
  "Analytics Dashboard Components tests",
  () => {
    // ==========================================
    // ANALYTICS TITLE
    // ==========================================

    describe(
      "AnalyticsTitle",
      () => {
        const analyticsTitles = [
          {
            text:
              "Analytics Dashboard",
          },
          {
            text:
              "WaterWise Intelligent Decision Support Services",
          },
          {
            text:
              "Per Purok Consumption",
          },
          {
            text:
              "Forecast water consumption across all puroks",
          },
        ];

        it.each(
          analyticsTitles
        )(
          "should render '$text'",
          ({ text }) => {
            render(
              <AnalyticsTitle />
            );

            expect(
              screen.getByText(
                text
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // OVERALL CONSUMPTION CARD
    // ==========================================

    describe(
      "AdminOverallConsumptionCard",
      () => {
        it(
          "should render default values",
          () => {
            render(
              <AdminOverallConsumptionCard />
            );

            expect(
              screen.getByText(
                "Overall Consumption"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "0"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "No data available"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render provided values",
          () => {
            render(
              <AdminOverallConsumptionCard
                value="500 m³"
                subtitle="June 2026"
              />
            );

            expect(
              screen.getByText(
                "500 m³"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "June 2026"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // MONTHLY CONSUMPTION CARD
    // ==========================================

    describe(
      "AdminMonthlyConsumptionCard",
      () => {
        it(
          "should render default values",
          () => {
            render(
              <AdminMonthlyConsumptionCard />
            );

            expect(
              screen.getByText(
                "Monthly Consumption"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "0"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "No data available"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render provided values",
          () => {
            render(
              <AdminMonthlyConsumptionCard
                value="120 m³"
                subtitle="July 2026"
              />
            );

            expect(
              screen.getByText(
                "120 m³"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "July 2026"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // YEARLY CONSUMPTION CARD
    // ==========================================

    describe(
      "AdminYearlyConsumptionCard",
      () => {
        it(
          "should render default values",
          () => {
            render(
              <AdminYearlyConsumptionCard />
            );

            expect(
              screen.getByText(
                "Yearly Consumption"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "0"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "No data available"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render provided values",
          () => {
            render(
              <AdminYearlyConsumptionCard
                value="1800 m³"
                subtitle="2026"
              />
            );

            expect(
              screen.getByText(
                "1800 m³"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "2026"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // PER-PUROK CONSUMPTION CARD
    // ==========================================

    describe(
      "AdminPerPurokConsumptionCard",
      () => {
        it(
          "should render all default puroks",
          () => {
            render(
              <AdminPerPurokConsumptionCard />
            );

            expect(
              screen.getByText(
                "Per Purok Consumption"
              )
            ).toBeInTheDocument();

            const values =
              screen.getAllByText(
                "- 0"
              );

            expect(
              values
            ).toHaveLength(6);

            for (
              let index = 1;
              index <= 6;
              index += 1
            ) {
              expect(
                screen.getByText(
                  `Purok ${index}`
                )
              ).toBeInTheDocument();
            }
          }
        );
      }
    );

    // ==========================================
    // ANOMALY ALERT CARD
    // ==========================================

    describe(
      "AnomalyAlertCard",
      () => {
        it(
          "should render default anomaly alert",
          () => {
            render(
              <AnomalyAlertCard />
            );

            expect(
              screen.getByText(
                "Unknown Area"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "No anomaly detected."
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Severity: N/A"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render provided anomaly data",
          () => {
            render(
              <AnomalyAlertCard
                area="Purok 3"
                message="Unusual water consumption detected."
                severity="High"
              />
            );

            expect(
              screen.getByText(
                "Purok 3"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Unusual water consumption detected."
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Severity: High"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // CONSUMPTION RANKING
    // ==========================================

    describe(
      "ConsumptionRankingSection",
      () => {
        it(
          "should render default ranking message",
          () => {
            render(
              <ConsumptionRankingSection />
            );

            expect(
              screen.getByText(
                "No consumption ranking available."
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render consumption ranking data",
          () => {
            render(
              <ConsumptionRankingSection
                data={[
                  {
                    purok:
                      "Purok 1",
                    consumption:
                      300,
                  },
                  {
                    purok:
                      "Purok 2",
                    consumption:
                      250,
                  },
                ]}
              />
            );

            expect(
              screen.getByText(
                "#1 Purok 1 - 300 m³"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "#2 Purok 2 - 250 m³"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // MONTHLY CONSUMPTION TREND
    // ==========================================

    describe(
      "MonthlyConsumptionTrend",
      () => {
        it(
          "should render default message",
          () => {
            render(
              <MonthlyConsumptionTrend />
            );

            expect(
              screen.getByText(
                "No monthly consumption data available."
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render monthly consumption data",
          () => {
            render(
              <MonthlyConsumptionTrend
                data={[
                  {
                    month:
                      "January",
                    consumption:
                      100,
                  },
                ]}
              />
            );

            expect(
              screen.getByText(
                "Monthly Consumption Graph"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "January - 100 m³"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // YEARLY CONSUMPTION TREND
    // ==========================================

    describe(
      "YearlyConsumptionTrend",
      () => {
        it(
          "should render default message",
          () => {
            render(
              <YearlyConsumptionTrend />
            );

            expect(
              screen.getByText(
                "No yearly consumption data available."
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render yearly consumption data",
          () => {
            render(
              <YearlyConsumptionTrend
                data={[
                  {
                    year:
                      "2026",
                    consumption:
                      1200,
                  },
                ]}
              />
            );

            expect(
              screen.getByText(
                "Yearly Consumption Graph"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "2026 - 1200 m³"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // PER-PUROK CONSUMPTION TREND
    // ==========================================

    describe(
      "PerPurokConsumptionTrend",
      () => {
        it(
          "should render the section title",
          () => {
            render(
              <PerPurokConsumptionTrend />
            );

            expect(
              screen.getByText(
                "Per Purok Consumption Trend"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render monthly purok consumption data",
          () => {
            render(
              <PerPurokConsumptionTrend
                data={{
                  "Purok 1": {
                    monthly: [
                      {
                        month:
                          "January",
                        consumption:
                          120,
                      },
                      {
                        month:
                          "February",
                        consumption:
                          150,
                      },
                    ],
                    yearly: [],
                  },
                }}
              />
            );

            expect(
              screen.getByText(
                "Purok 1 Water Consumption Forecast"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "5 Months Historical Consumption with 1-Month Predicted Demand"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Consumption Graph"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "January - 120 m³"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "February - 150 m³"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render yearly purok consumption data",
          () => {
            render(
              <PerPurokConsumptionTrend
                view="yearly"
                data={{
                  "Purok 1": {
                    monthly: [],
                    yearly: [
                      {
                        year:
                          "2025",
                        consumption:
                          1400,
                      },
                      {
                        year:
                          "2026",
                        consumption:
                          1600,
                      },
                    ],
                  },
                }}
              />
            );

            expect(
              screen.getByText(
                "5 Years Historical Consumption with 1-Year Predicted Demand"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "2025 - 1400 m³"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "2026 - 1600 m³"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // PUROK COMPARISON CHART
    // ==========================================

    describe(
      "PurokComparisonChart",
      () => {
        it(
          "should render default message",
          () => {
            render(
              <PurokComparisonChart />
            );

            expect(
              screen.getByText(
                "No purok comparison data available."
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render comparison data",
          () => {
            render(
              <PurokComparisonChart
                data={[
                  {
                    purok:
                      "Purok 1",
                    consumption:
                      300,
                  },
                ]}
              />
            );

            expect(
              screen.getByText(
                "Monthly Comparison Bar Chart"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Purok 1 - 300 m³"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // RECOMMENDATION CARD
    // ==========================================

    describe(
      "RecommendationCard",
      () => {
        it(
          "should render default values",
          () => {
            render(
              <RecommendationCard />
            );

            expect(
              screen.getByText(
                "No Title"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "No description available."
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Priority: N/A"
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render provided values",
          () => {
            render(
              <RecommendationCard
                title="Monitor Consumption"
                description="Review recent water consumption records."
                priority="Medium"
              />
            );

            expect(
              screen.getByText(
                "Monitor Consumption"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Review recent water consumption records."
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Priority: Medium"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
    // RECOMMENDATION SECTION
    // ==========================================

    describe(
      "RecommendationSection",
      () => {
        it(
          "should render default message",
          () => {
            render(
              <RecommendationSection />
            );

            expect(
              screen.getByText(
                "No recommendations or anomaly alerts available."
              )
            ).toBeInTheDocument();
          }
        );

        it(
          "should render recommendation and anomaly alert data",
          () => {
            render(
              <RecommendationSection
                recommendations={[
                  {
                    title:
                      "Reduce Consumption",
                    description:
                      "Monitor high water usage.",
                    priority:
                      "High",
                  },
                ]}
                anomalyAlerts={[
                  {
                    area:
                      "Purok 3",
                    message:
                      "Unusual water consumption detected.",
                    severity:
                      "High",
                  },
                ]}
              />
            );

            expect(
              screen.getByText(
                "Reduce Consumption"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Monitor high water usage."
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Priority: High"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Purok 3"
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Unusual water consumption detected."
              )
            ).toBeInTheDocument();

            expect(
              screen.getByText(
                "Severity: High"
              )
            ).toBeInTheDocument();
          }
        );
      }
    );

    // ==========================================
// SIDEBAR
// ==========================================

describe("Sidebar", () => {
  it("should render without crashing", () => {
    // Arrange
    const { container } =
      renderWithRouter(
        <Sidebar />
      );

    // Assert
    expect(
      container.firstChild
    ).toBeInTheDocument();
  });

  it("should render sidebar content", () => {
    // Arrange
    const { container } =
      renderWithRouter(
        <Sidebar />
      );

    // Assert
    expect(
      container.textContent
    ).toBeDefined();

    expect(
      container.firstElementChild
    ).not.toBeNull();
  });
});
  });