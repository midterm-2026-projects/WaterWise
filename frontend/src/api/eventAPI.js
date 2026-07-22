import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (configuredBaseUrl || "/api").replace(/\/$/, "");

const eventClient = axios.create({
  baseURL: `${API_BASE_URL}/events`,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.filter(Boolean);
  return String(tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function normalizeEvent(event) {
  const date = event.date ?? event.event_date ?? "";
  const time = event.time ?? event.event_time ?? "";

  return {
    ...event,
    id: event.id ?? event.event_id,
    title: event.title ?? event.event_title ?? "",
    description: event.description ?? "",
    date,
    time,
    schedule: event.schedule ?? [date, time].filter(Boolean).join(" - "),
    location: event.location ?? "",
    tags: normalizeTags(event.tags),
    status: event.status ?? "Scheduled",
  };
}

function eventPayload(event) {
  return {
    title: event.title?.trim(),
    description: event.description?.trim(),
    date: event.date,
    time: event.time,
    location: event.location?.trim(),
    tags: normalizeTags(event.tags),
    status: event.status ?? "Scheduled",
  };
}

export async function fetchEvents(options = {}) {
  const response = await eventClient.get("/", options);
  const events = response.data?.data ?? [];
  return Array.isArray(events) ? events.map(normalizeEvent) : [];
}

export async function fetchEventById(eventId, options = {}) {
  const response = await eventClient.get(`/${eventId}`, options);
  const event = response.data?.data;
  return event ? normalizeEvent(event) : null;
}

export async function createEvent(event, options = {}) {
  const response = await eventClient.post("/", eventPayload(event), options);
  return normalizeEvent(response.data?.data ?? response.data);
}

export async function updateEvent(eventId, event, options = {}) {
  const response = await eventClient.put(`/${eventId}`, eventPayload(event), options);
  return normalizeEvent(response.data?.data ?? response.data);
}

export async function deleteEvent(eventId, options = {}) {
  const response = await eventClient.delete(`/${eventId}`, options);
  return response.data;
}

export default eventClient;
