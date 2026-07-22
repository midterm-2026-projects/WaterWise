import { useState } from "react";

const emptyEvent = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  tags: "",
};

export default function EventForm({ initialEvent, onCancel, onSubmit, submitting = false }) {
  const [event, setEvent] = useState({
    ...emptyEvent,
    ...initialEvent,
    tags: Array.isArray(initialEvent?.tags) ? initialEvent.tags.join(", ") : initialEvent?.tags ?? "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saved = await onSubmit?.({ ...event });

    if (!onSubmit) alert("Event Saved!");

    if (saved !== false) setEvent(emptyEvent);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <p className="text-xs font-bold uppercase tracking-wider text-violet-600">{initialEvent ? "Update schedule" : "New schedule"}</p><h2 className="mb-6 mt-1 text-2xl font-extrabold">
        {initialEvent ? "Edit Event" : "Create Event"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          rows={4}
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <input
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <input
          name="tags"
          placeholder="Event Tags"
          value={event.tags}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Saving..." : initialEvent ? "Update Event" : "Save Event"}
        </button>
        {initialEvent && <button className="ml-3 rounded-xl bg-slate-100 px-6 py-3 font-bold text-slate-700 hover:bg-slate-200" onClick={onCancel} type="button">Cancel</button>}
      </form>
    </div>
  );
}
