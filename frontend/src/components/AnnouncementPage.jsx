import announcementData from "../data/announcementData";

export default function AnnouncementPage({
  announcements = announcementData,
  onDelete,
}) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Published feed</p><h2 className="mt-1 text-2xl font-extrabold">
        Announcements
      </h2></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{announcements.length} published</span></div>

      <div className="space-y-4">
        {announcements.length === 0 && (
          <p className="rounded-lg border border-dashed p-6 text-center text-gray-500">
            No announcements published yet.
          </p>
        )}
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/30 p-5 transition hover:border-emerald-200 hover:shadow-md"
          >
            <h3 className="text-xl font-extrabold text-slate-900">
              {announcement.title}
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              {announcement.content}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              <strong>Publication Date:</strong>{" "}
              {announcement.publicationDate}
            </p>

            <p className="text-sm text-gray-600">
              <strong>Related Event:</strong>{" "}
              {announcement.relatedEvent}
            </p>

            {onDelete && (
              <button
                className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-100"
                onClick={() => onDelete(announcement.id)}
                type="button"
              >
                Delete Announcement
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
