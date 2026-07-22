import { FiEdit2, FiEye, FiUsers } from "react-icons/fi";

function statusClass(status) {
  if (status === "Paid") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "Unpaid") return "bg-red-50 text-red-700 ring-red-200";
  return "bg-amber-50 text-amber-700 ring-amber-200";
}

function ConsumerListTable({ consumers = [], onView = () => {}, onEdit = () => {} }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white"><FiUsers /></span>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Consumer directory</h2>
          <p className="text-sm text-slate-500">{consumers.length} registered account{consumers.length === 1 ? "" : "s"}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              {['Account Name', 'Full Name', 'Contact Number', 'Purok', 'Email Address', 'Payment Status', 'Actions'].map((heading) => <th className="px-5 py-3.5" key={heading}>{heading}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {consumers.length === 0 ? (
              <tr><td className="px-6 py-16 text-center" colSpan={7}><FiUsers className="mx-auto h-9 w-9 text-slate-300" /><p className="mt-3 font-bold text-slate-700">No consumers found.</p><p className="mt-1 text-sm text-slate-500">Register a consumer to populate the directory.</p></td></tr>
            ) : consumers.map((consumer) => (
              <tr className="transition hover:bg-sky-50/40" key={consumer.id}>
                <td className="px-5 py-4 font-mono text-xs font-bold text-sky-700">{consumer.accountName}</td>
                <td className="px-5 py-4 font-bold text-slate-900">{consumer.fullName}</td>
                <td className="px-5 py-4 text-slate-600">{consumer.contactNumber}</td>
                <td className="px-5 py-4 text-slate-600">{consumer.purok}</td>
                <td className="px-5 py-4 text-slate-600">{consumer.email}</td>
                <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClass(consumer.paymentStatus)}`}>{consumer.paymentStatus}</span></td>
                <td className="px-5 py-4"><div className="flex gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-3 py-2 font-bold text-sky-700 transition hover:bg-sky-100" onClick={() => onView(consumer)} type="button"><FiEye /> View</button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 font-bold text-amber-700 transition hover:bg-amber-100" onClick={() => onEdit(consumer)} type="button"><FiEdit2 /> Edit</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ConsumerListTable;
