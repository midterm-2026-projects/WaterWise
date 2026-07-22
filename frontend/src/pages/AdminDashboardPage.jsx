import AnalyticsTitle from "../components/AnalyticsTitle";
import AdminOverallConsumptionCard from "../components/AdminOverallConsumptionCard";
import HistoricalConsumptionSummary from "../components/HistoricalConsumptionSummary";

export default function AdminDashboardPage() {
  return (
    <main className="space-y-8" data-testid="admin-dashboard">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)] sm:p-8">
        <AnalyticsTitle />
        <div className="mt-3 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Water operations overview
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Review recorded consumption using historical water data.
          </p>
        </div>
      </header>

      <section aria-labelledby="dashboard-summary" className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">Live indicators</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900" id="dashboard-summary">Consumption summary</h2>
        </div>
        <div className="max-w-md">
          <AdminOverallConsumptionCard />
        </div>
        <HistoricalConsumptionSummary />
      </section>

    </main>
  );
}
