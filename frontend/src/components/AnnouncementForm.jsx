import { useState } from "react";

export default function AnnouncementForm({ onSubmit }) {
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

    onSubmit?.({ ...announcement });

    if (!onSubmit) alert("Announcement Published!");

    setAnnouncement({
      title: "",
      content: "",
      publicationDate: "",
      relatedEvent: "",
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">New communication</p><h2 className="mb-6 mt-1 text-2xl font-extrabold">
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
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

        <textarea
          name="content"
          placeholder="Announcement Content"
          value={announcement.content}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

        <input
          type="date"
          name="publicationDate"
          value={announcement.publicationDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

        <select
          name="relatedEvent"
          value={announcement.relatedEvent}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
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
          className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
}
