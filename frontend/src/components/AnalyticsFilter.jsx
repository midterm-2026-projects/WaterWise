import { useState } from "react";

import MonthlyConsumptionTrend from "./MonthlyConsumptionTrend";
import YearlyConsumptionTrend from "./YearlyConsumptionTrend";
import PerPurokConsumptionTrend from "./PerPurokConsumptionTrend";

import {
  monthlyConsumptionData,
  yearlyConsumptionData,
  purokConsumptionData,
} from "../data/analyticsData";

const AnalyticsFilter = ({
  monthlyData = monthlyConsumptionData,
  yearlyData = yearlyConsumptionData,
  purokData = purokConsumptionData,
}) => {
  const [dashboardView, setDashboardView] =
    useState("Overall");

  const [forecastType, setForecastType] =
    useState("Monthly");

  return (
    <div>
      <h1>Analytics Filter</h1>

      <h2>Dashboard View</h2>

      <button
        onClick={() => setDashboardView("Overall")}
      >
        Overall
      </button>

      <button
        onClick={() => setDashboardView("All Puroks")}
      >
        All Puroks
      </button>

      <h2>Forecast Type</h2>

      <button
        onClick={() => setForecastType("Monthly")}
      >
        Monthly
      </button>

      <button
        onClick={() => setForecastType("Yearly")}
      >
        Yearly
      </button>

      <hr />

      {dashboardView === "Overall" &&
        forecastType === "Monthly" && (
          <MonthlyConsumptionTrend
            data={monthlyData}
          />
        )}

      {dashboardView === "Overall" &&
        forecastType === "Yearly" && (
          <YearlyConsumptionTrend
            data={yearlyData}
          />
        )}

      {dashboardView === "All Puroks" &&
        forecastType === "Monthly" && (
          <PerPurokConsumptionTrend
            data={purokData}
          />
        )}

      {dashboardView === "All Puroks" &&
        forecastType === "Yearly" && (
          <PerPurokConsumptionTrend
            data={purokData}
            view="yearly"
          />
        )}
    </div>
  );
};

export default AnalyticsFilter;