import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Droplets } from "lucide-react";

const MeterReadingTable = ({ readings = [], onEdit, onDelete, readOnly = false }) => {
  if (!readings.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><Droplets className="h-7 w-7" /></span>
        <p className="mt-4 font-bold text-slate-800">No meter reading records found.</p>
        <p className="mt-1 text-sm text-slate-500">Try changing your search or purok filter.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Reading records</h2>
          <p className="mt-0.5 text-sm text-slate-500">{readings.length} consumer reading{readings.length === 1 ? "" : "s"}</p>
        </div>
        {readOnly && <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">View only</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full text-left text-sm" role="table">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5" scope="col">Consumer No.</th>
              <th className="px-5 py-3.5" scope="col">Consumer Name</th>
              <th className="px-5 py-3.5" scope="col">Purok</th>
              <th className="px-5 py-3.5 text-right" scope="col">Previous</th>
              <th className="px-5 py-3.5 text-right" scope="col">Current</th>
              <th className="px-5 py-3.5 text-right" scope="col">Consumption</th>
              <th className="px-5 py-3.5" scope="col">Reading Date</th>
              <th className="px-5 py-3.5" scope="col">Status</th>
              {!readOnly && <th className="px-5 py-3.5 text-right" scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {readings.map((reading) => (
              <tr className="transition hover:bg-sky-50/40" key={reading.id}>
                <td className="px-5 py-4 font-mono text-xs font-bold text-sky-700">{reading.consumerNo}</td>
                <td className="px-5 py-4 font-bold text-slate-900">{reading.consumerName}</td>
                <td className="px-5 py-4"><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{reading.purok}</span></td>
                <td className="px-5 py-4 text-right font-mono text-slate-500">{reading.previousReading}</td>
                <td className="px-5 py-4 text-right font-mono font-bold text-slate-800">{reading.currentReading}</td>
                <td className="px-5 py-4 text-right"><span className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 font-mono font-extrabold text-sky-700"><Droplets className="h-3.5 w-3.5" />{reading.consumption} m³</span></td>
                <td className="px-5 py-4 font-mono text-xs text-slate-600">{reading.readingDate}</td>
                <td className="px-5 py-4"><span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${reading.status === "Recorded" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-amber-50 text-amber-700 ring-amber-200"}`}>{reading.status}</span></td>
                {!readOnly && <td className="px-5 py-4"><div className="flex justify-end gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 font-bold text-amber-700 hover:bg-amber-100" onClick={() => onEdit?.(reading)} type="button"><FiEdit2 /> Edit</button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 font-bold text-red-700 hover:bg-red-100" onClick={() => onDelete?.(reading.id)} type="button"><FiTrash2 /> Delete</button>
                </div></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MeterReadingTable;
