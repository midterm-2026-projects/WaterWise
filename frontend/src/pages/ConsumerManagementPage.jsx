import { useMemo, useState } from "react";
import { FiCreditCard, FiMail, FiPhone, FiSearch, FiUsers } from "react-icons/fi";
import ConsumerForm from "../components/ConsumerForm";
import ConsumerInfoGrid from "../components/ConsumerInfoGrid";
import ConsumerListTable from "../components/ConsumerListTable";

function ConsumerManagementPage() {
  const [consumers, setConsumers] = useState([]);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [selectionMode, setSelectionMode] = useState("");
  const [query, setQuery] = useState("");

  const addConsumer = (consumer) => {
    const savedConsumer = {
      ...consumer,
      id: crypto.randomUUID(),
      paymentStatus: "No billing record",
    };
    setConsumers((current) => [savedConsumer, ...current]);
    setSelectedConsumer(savedConsumer);
    setSelectionMode("view");
  };

  const visibleConsumers = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return consumers;
    return consumers.filter((consumer) =>
      [consumer.accountName, consumer.fullName, consumer.email, consumer.purok]
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [consumers, query]);

  const selectConsumer = (consumer, mode) => {
    setSelectedConsumer(consumer);
    setSelectionMode(mode);
  };

  return (
    <main className="space-y-6">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Account administration</p>
        <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Consumer Management</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Register community accounts, review contact details, and monitor billing readiness from one workspace.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-80">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><FiUsers className="text-sky-300" /><p className="mt-3 text-2xl font-bold">{consumers.length}</p><p className="text-xs text-slate-300">Total consumers</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><FiCreditCard className="text-emerald-300" /><p className="mt-3 text-2xl font-bold">{consumers.filter((item) => item.paymentStatus === "Paid").length}</p><p className="text-xs text-slate-300">Paid accounts</p></div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
        <ConsumerForm onSubmit={addConsumer} />
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600">{selectionMode === "edit" ? "Edit context" : "Account preview"}</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">{selectionMode === "edit" ? "Selected for editing" : "Consumer details"}</h2>
          </div>
          <div className="p-5 sm:p-6">
            {selectedConsumer ? <div className="space-y-4">
              <ConsumerInfoGrid houseNumber={selectedConsumer.accountName} name={selectedConsumer.fullName} purok={selectedConsumer.purok} />
              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><FiMail className="text-sky-600" /><span className="break-all text-sm font-semibold text-slate-700">{selectedConsumer.email}</span></div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><FiPhone className="text-sky-600" /><span className="text-sm font-semibold text-slate-700">{selectedConsumer.contactNumber}</span></div>
              </div>
            </div> : <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center"><FiUsers className="h-10 w-10 text-slate-300" /><p className="mt-4 font-bold text-slate-700">No consumer selected</p><p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">Choose View or Edit from the directory, or register a new consumer.</p></div>}
          </div>
        </div>
      </section>

      <label className="relative block max-w-xl">
        <span className="sr-only">Search consumers</span>
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" onChange={(event) => setQuery(event.target.value)} placeholder="Search account, name, email, or purok" type="search" value={query} />
      </label>

      <ConsumerListTable consumers={visibleConsumers} onEdit={(consumer) => selectConsumer(consumer, "edit")} onView={(consumer) => selectConsumer(consumer, "view")} />
    </main>
  );
}

export default ConsumerManagementPage;
