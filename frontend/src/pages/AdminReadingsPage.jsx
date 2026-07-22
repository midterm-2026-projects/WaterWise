import { useMemo, useState } from "react";
import { Droplets, Gauge, Search, Users } from "lucide-react";
import MeterReadingTable from "../components/MeterReadingTable";
import meterReadingData from "../data/meterReadingData";

export default function AdminReadingsPage() {
  const [query, setQuery] = useState("");
  const [purok, setPurok] = useState("all");

  const readings = useMemo(() => {
    const term = query.trim().toLowerCase();
    return meterReadingData.filter((reading) => {
      const matchesQuery = !term || [reading.consumerNo, reading.consumerName, reading.purok].some((value) => String(value).toLowerCase().includes(term));
      return matchesQuery && (purok === "all" || reading.purok === purok);
    });
  }, [purok, query]);

  const total = readings.reduce((sum, reading) => sum + Number(reading.consumption || 0), 0);
  const average = readings.length ? total / readings.length : 0;
  const highest = readings.reduce((maximum, reading) => Math.max(maximum, Number(reading.consumption || 0)), 0);

  const metrics = [
    { Icon: Users, label: "Visible consumers", value: readings.length, tone: "bg-indigo-100 text-indigo-700" },
    { Icon: Droplets, label: "Total consumption", value: `${total.toLocaleString()} m³`, tone: "bg-sky-100 text-sky-700" },
    { Icon: Gauge, label: "Average usage", value: `${average.toFixed(1)} m³`, tone: "bg-emerald-100 text-emerald-700" },
    { Icon: Gauge, label: "Highest usage", value: `${highest.toLocaleString()} m³`, tone: "bg-amber-100 text-amber-700" },
  ];

  return (
    <main className="space-y-6">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:p-8">
        <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-300">Read-only records</span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Consumer consumption readings</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Review meter movements, recorded water use, and consumption levels across every purok.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ Icon, label, value, tone }) => <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={label}><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span><p className="mt-4 text-sm font-semibold text-slate-500">{label}</p><p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p></article>)}
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
        <label className="relative min-w-0 flex-1"><span className="sr-only">Search consumption readings</span><Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" onChange={(event) => setQuery(event.target.value)} placeholder="Search consumer number, name, or purok" type="search" value={query} /></label>
        <label><span className="sr-only">Filter by purok</span><select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 sm:w-44" onChange={(event) => setPurok(event.target.value)} value={purok}><option value="all">All puroks</option>{[1, 2, 3, 4, 5].map((number) => <option key={number} value={`Purok ${number}`}>Purok {number}</option>)}</select></label>
      </section>

      <MeterReadingTable readOnly readings={readings} />
    </main>
  );
}
