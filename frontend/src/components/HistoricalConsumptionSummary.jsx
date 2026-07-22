import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays, Droplets } from "lucide-react";
import {
  fetchMonthlyHistory,
  fetchYearlyHistory,
} from "../services/consumptionAPI";

const unwrap = (response) =>
  response?.data?.data ?? response?.data ?? response ?? [];

const consumptionValue = (record) =>
  Number(
    record?.consumption ??
      record?.totalConsumption ??
      record?.total_consumption ??
      record?.value ??
      0,
  );

function HistoryCard({ Icon, accent, label, records, periodKey }) {
  const latest = records.at(-1);
  const total = records.reduce(
    (sum, record) => sum + consumptionValue(record),
    0,
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">
            {consumptionValue(latest).toLocaleString("en-PH", {
              maximumFractionDigits: 2,
            })}{" "}
            <span className="text-sm font-semibold text-slate-400">m³</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Latest recorded period: {latest?.[periodKey] ?? "No records"}
          </p>
        </div>
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-6 w-6" />
        </span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-500">Historical total</span>
          <strong className="font-mono text-slate-900">
            {total.toLocaleString("en-PH", { maximumFractionDigits: 2 })} m³
          </strong>
        </div>
        <div className="mt-3 space-y-2">
          {records.slice(-4).reverse().map((record, index) => (
            <div
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs"
              key={`${record?.[periodKey] ?? "period"}-${index}`}
            >
              <span className="font-semibold text-slate-500">
                {record?.[periodKey] ?? "Unknown period"}
              </span>
              <span className="font-mono font-bold text-slate-800">
                {consumptionValue(record).toLocaleString("en-PH")} m³
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function HistoricalConsumptionSummary() {
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([fetchMonthlyHistory(), fetchYearlyHistory()])
      .then(([monthlyResponse, yearlyResponse]) => {
        if (!active) return;
        const monthlyData = unwrap(monthlyResponse);
        const yearlyData = unwrap(yearlyResponse);
        setMonthly(Array.isArray(monthlyData) ? monthlyData : []);
        setYearly(Array.isArray(yearlyData) ? yearlyData : []);
      })
      .catch((requestError) => {
        if (active) setError(requestError?.message ?? "Unable to load historical consumption.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="grid gap-5 md:grid-cols-2">{[1, 2].map((item) => <div className="h-72 animate-pulse rounded-2xl bg-slate-200" key={item} />)}</div>;
  }

  if (error) {
    return <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><AlertCircle className="h-5 w-5" />{error}</div>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <HistoryCard Icon={Droplets} accent="bg-sky-100 text-sky-700" label="Monthly historical consumption" periodKey="month" records={monthly} />
      <HistoryCard Icon={CalendarDays} accent="bg-indigo-100 text-indigo-700" label="Yearly historical consumption" periodKey="year" records={yearly} />
    </div>
  );
}
