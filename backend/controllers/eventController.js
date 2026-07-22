import {
  createEvent as createEventService,
  readEvents,
  searchEvent,
  editEvent,
  removeEvent,
} from "../services/EventService.js";

function parseEventId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function validationDetails(error) {
  try {
    const details = JSON.parse(error.message);
    return details && typeof details === "object" ? details : null;
  } catch {
    return null;
  }
}

function sendEventError(res, error) {
  if (error.message === "Event not found.") {
    return res.status(404).json({ message: error.message });
  }

  const errors = validationDetails(error);
  if (errors) {
    return res.status(400).json({ message: "Event validation failed.", errors });
  }

  return res.status(500).json({ message: "Unable to process the event request." });
}

export async function listEvents(_req, res) {
  try {
    return res.status(200).json({ data: await readEvents() });
  } catch (error) {
    return sendEventError(res, error);
  }
}

export async function getEvent(req, res) {
  const id = parseEventId(req.params.id);
  if (!id) return res.status(400).json({ message: "A valid event ID is required." });

  try {
    return res.status(200).json({ data: await searchEvent(id) });
  } catch (error) {
    return sendEventError(res, error);
  }
}

export async function createEvent(req, res) {
  try {
    const event = await createEventService(req.body);
    return res.status(201).json({ message: "Event created successfully.", data: event });
  } catch (error) {
    return sendEventError(res, error);
  }
}

export async function updateEvent(req, res) {
  const id = parseEventId(req.params.id);
  if (!id) return res.status(400).json({ message: "A valid event ID is required." });

  try {
    const event = await editEvent(id, req.body);
    return res.status(200).json({ message: "Event updated successfully.", data: event });
  } catch (error) {
    return sendEventError(res, error);
  }
}

export async function deleteEvent(req, res) {
  const id = parseEventId(req.params.id);
  if (!id) return res.status(400).json({ message: "A valid event ID is required." });

  try {
    return res.status(200).json(await removeEvent(id));
  } catch (error) {
    return sendEventError(res, error);
  }
}
