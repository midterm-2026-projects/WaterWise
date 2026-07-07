import {

  insertAnnouncement,
  getAnnouncements,
  findAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,

} from "../models/AnnouncementModel.js";


import {
  validateAnnouncement,
} from "../validation/AnnouncementValidation.js";



// CREATE
export function createAnnouncement(
  announcementData
) {


  const validation =
    validateAnnouncement(
      announcementData
    );


  if (!validation.isValid) {

    throw new Error(
      JSON.stringify(
        validation.errors
      )
    );

  }


  return insertAnnouncement(
    announcementData
  );

}




// READ ALL
export function readAnnouncements() {

  return getAnnouncements();

}




// SEARCH
export function searchAnnouncement(
  id
) {


  const announcement =
    findAnnouncementById(id);



  if (!announcement) {

    throw new Error(
      "Announcement not found."
    );

  }


  return announcement;

}





// UPDATE
export function editAnnouncement(
  id,
  announcementData
) {


  // Check existing record

  searchAnnouncement(id);



  const validation =
    validateAnnouncement(
      announcementData
    );


  if (!validation.isValid) {

    throw new Error(
      JSON.stringify(
        validation.errors
      )
    );

  }



  return updateAnnouncement(
    id,
    announcementData
  );

}





// DELETE
export function removeAnnouncement(
  id
) {


  // Check existing record

  searchAnnouncement(id);



  deleteAnnouncement(id);



  return {

    message:
      "Announcement deleted successfully.",

  };

}