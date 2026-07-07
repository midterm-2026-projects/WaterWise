import {
  insertEvent,
  getEvents,
  findEventById,
  updateEvent,
  deleteEvent,
} from "../models/EventModel.js";


import {
  validateEvent,
} from "../validation/EventValidation.js";



// CREATE
export function createEvent(eventData){

  const validation =
    validateEvent(eventData);


  if(!validation.isValid){
    throw new Error(
      JSON.stringify(validation.errors)
    );
  }


  return insertEvent(eventData);
}



// READ ALL
export function readEvents(){

  return getEvents();

}



// SEARCH
export function searchEvent(id){

  const event =
    findEventById(id);


  if(!event){

    throw new Error(
      "Event not found."
    );

  }


  return event;

}



// UPDATE
export function editEvent(
  id,
  eventData
){


  // check if exists first

  searchEvent(id);



  const validation =
    validateEvent(eventData);


  if(!validation.isValid){

    throw new Error(
      JSON.stringify(validation.errors)
    );

  }



  return updateEvent(
    id,
    eventData
  );

}



// DELETE
export function removeEvent(id){


  // check if exists first

  searchEvent(id);



  deleteEvent(id);



  return {
    message:
      "Event deleted successfully.",
  };

}