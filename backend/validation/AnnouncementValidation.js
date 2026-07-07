export function validateAnnouncement(
  announcement
) {

  const errors = {};


  if (
    !announcement.title ||
    announcement.title.trim() === ""
  ) {

    errors.title =
      "Announcement title is required.";

  }


  if (
    !announcement.content ||
    announcement.content.trim() === ""
  ) {

    errors.content =
      "Announcement content is required.";

  }


  if (
    !announcement.publicationDate
  ) {

    errors.publicationDate =
      "Publication date is required.";

  }


  if (
    !announcement.relatedEvent ||
    announcement.relatedEvent.trim() === ""
  ) {

    errors.relatedEvent =
      "Related event is required.";

  }



  return {

    isValid:
      Object.keys(errors).length === 0,

    errors,

  };

}