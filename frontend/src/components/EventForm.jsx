import { useState } from "react";

export default function EventForm() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    tags: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Event Saved!");

    setEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      tags: "",
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Create Event
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
          className="w-full rounded border p-3"
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          className="w-full rounded border p-3"
          rows={4}
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          name="tags"
          placeholder="Event Tags"
          value={event.tags}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Event
        </button>
      </form>
    </div>
  );
}