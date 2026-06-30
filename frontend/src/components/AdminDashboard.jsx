import AdminOverallConsumptionCard from "./AdminOverallConsumptionCard";
import AdminMonthlyConsumptionCard from "./AdminMonthlyConsumptionCard";
import AdminYearlyConsumptionCard from "./AdminYearlyConsumptionCard";
import AdminPerPurokConsumptionCard from "./AdminPerPurokConsumptionCard";
import { dashboardKpis } from "../data/dashboardData";

function AdminDashboard() {
  return (
    <div>
      <AdminOverallConsumptionCard
        value={dashboardKpis.overallConsumption.value}
        subtitle={dashboardKpis.overallConsumption.subtitle}
      />

      <AdminMonthlyConsumptionCard
        value={dashboardKpis.monthlyConsumption.value}
        subtitle={dashboardKpis.monthlyConsumption.subtitle}
      />

      <AdminYearlyConsumptionCard
        value={dashboardKpis.yearlyConsumption.value}
        subtitle={dashboardKpis.yearlyConsumption.subtitle}
      />

      <AdminPerPurokConsumptionCard
        puroks={dashboardKpis.perPurokConsumption}
      />
    </div>
  );
}

export default AdminDashboard;