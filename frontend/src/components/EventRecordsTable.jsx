export default function EventRecordsTable({
  events = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <p className="text-xs font-bold uppercase tracking-wider text-violet-600">Schedule registry</p><h2 className="mb-4 mt-1 text-2xl font-extrabold">
        Event Records
      </h2>

      <div className="overflow-x-auto"><table className="min-w-[850px] w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="p-3 text-left">Event Title</th>
            <th className="border p-3">Schedule</th>
            <th className="border p-3">Location</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Event Tags</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.length === 0 && (
            <tr>
              <td className="border p-6 text-center text-gray-500" colSpan={6}>
                No event records found.
              </td>
            </tr>
          )}
          {events.map((event) => (
            <tr
              key={event.id}
              className="text-center transition hover:bg-violet-50/40"
            >
              <td className="border p-3">{event.title}</td>

              <td className="border p-3">
                {event.schedule}
              </td>

              <td className="border p-3">
                {event.location}
              </td>

              <td className="border p-3">
                {event.status}
              </td>

              <td className="border p-3">
                {event.tags}
              </td>

              <td className="border p-3 space-x-2">
                <button
                  className="rounded-lg bg-amber-50 px-3 py-2 font-bold text-amber-700 hover:bg-amber-100"
                  onClick={() => onEdit?.(event)}
                  type="button"
                >
                  Edit
                </button>

                <button
                  className="rounded-lg bg-red-50 px-3 py-2 font-bold text-red-700 hover:bg-red-100"
                  onClick={() => onDelete?.(event.id)}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}
