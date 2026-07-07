export function validateEvent(event) {
  const errors = {};

  if (!event.title || event.title.trim() === "") {
    errors.title = "Event title is required.";
  }

  if (
    !event.description ||
    event.description.trim() === ""
  ) {
    errors.description =
      "Event description is required.";
  }

  if (!event.date) {
    errors.date = "Event date is required.";
  }

  if (!event.time) {
    errors.time = "Event time is required.";
  }

  if (
    !event.location ||
    event.location.trim() === ""
  ) {
    errors.location =
      "Event location is required.";
  }

  if (
    !event.tags ||
    event.tags.length === 0
  ) {
    errors.tags =
      "At least one event tag is required.";
  }


  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
}