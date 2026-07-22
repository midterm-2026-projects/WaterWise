import { useState } from "react";

export default function AnnouncementForm() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
    publicationDate: "",
    relatedEvent: "",
  });

  const handleChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Announcement Published!");

    setAnnouncement({
      title: "",
      content: "",
      publicationDate: "",
      relatedEvent: "",
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Create Announcement
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Announcement Title"
          value={announcement.title}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <textarea
          name="content"
          placeholder="Announcement Content"
          value={announcement.content}
          onChange={handleChange}
          rows={5}
          className="w-full rounded border p-3"
        />

        <input
          type="date"
          name="publicationDate"
          value={announcement.publicationDate}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <select
          name="relatedEvent"
          value={announcement.relatedEvent}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="">
            Select Related Event
          </option>

          <option value="Barangay Assembly">
            Barangay Assembly
          </option>

          <option value="Water System Maintenance">
            Water System Maintenance
          </option>

          <option value="Community Clean-up">
            Community Clean-up
          </option>
        </select>

        <button
          type="submit"
          className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
}