const announcements = [
  {
    id: 1,
    title: "Water Interruption Notice",
    content:
      "Water service will be temporarily unavailable due to maintenance.",
    publicationDate: "July 5, 2026",
    relatedEvent: "Water System Maintenance",
  },
  {
    id: 2,
    title: "Barangay Assembly Reminder",
    content:
      "Residents are encouraged to attend the upcoming assembly.",
    publicationDate: "July 8, 2026",
    relatedEvent: "Barangay Assembly",
  },
];

export default function AnnouncementPage() {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Announcements
      </h2>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="rounded-lg border p-4"
          >
            <h3 className="text-xl font-semibold">
              {announcement.title}
            </h3>

            <p className="mt-2">
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
          </div>
        ))}
      </div>
    </div>
  );
}