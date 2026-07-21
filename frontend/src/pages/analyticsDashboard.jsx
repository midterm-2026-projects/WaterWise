import Sidebar from "./components/Sidebar";

import AnalyticsTitle from "./components/AnalyticsTitle";

import AdminOverallConsumptionCard from "./components/AdminOverallConsumptionCard";
import AdminMonthlyConsumptionCard from "./components/AdminMonthlyConsumptionCard";
import AdminYearlyConsumptionCard from "./components/AdminYearlyConsumptionCard";
import AdminPerPurokConsumptionCard from "./components/AdminPerPurokConsumptionCard";

import AnomalyAlertCard from "./components/AnomalyAlertCard";
import ConsumptionRankingSection from "./components/ConsumptionRankingSection";

import MonthlyConsumptionTrend from "./components/MonthlyConsumptionTrend";
import YearlyConsumptionTrend from "./components/YearlyConsumptionTrend";
import PerPurokConsumptionTrend from "./components/PerPurokConsumptionTrend";
import PurokComparisonChart from "./components/PurokComparisonChart";

import RecommendationCard from "./components/RecommendationCard";
import RecommendationSection from "./components/RecommendationSection";

const AnalyticsDashboard = () => {
  return (
    <div data-testid="analytics-dashboard">
      <Sidebar />

      <main>
        <AnalyticsTitle />

        <section aria-label="Consumption summary">
          <AdminOverallConsumptionCard />
          <AdminMonthlyConsumptionCard />
          <AdminYearlyConsumptionCard />
          <AdminPerPurokConsumptionCard />
        </section>

        <section aria-label="Consumption ranking">
          <ConsumptionRankingSection />
        </section>

        <section aria-label="Consumption trends">
          <MonthlyConsumptionTrend />
          <YearlyConsumptionTrend />
          <PerPurokConsumptionTrend />
          <PurokComparisonChart />
        </section>

        <section aria-label="Anomaly alerts">
          <AnomalyAlertCard />
        </section>

        <section aria-label="Recommendations">
          <RecommendationCard />
          <RecommendationSection />
        </section>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;