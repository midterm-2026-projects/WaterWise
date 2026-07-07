import mockEventData from "../data/mockEventData.js";


export function insertEvent(event) {

  const newEvent = {
    id: mockEventData.length + 1,
    ...event,
  };

  mockEventData.push(newEvent);

  return newEvent;
}



export function getEvents() {
  return mockEventData;
}



// SEARCH EVENT
export function findEventById(id) {

  return mockEventData.find(
    (event) =>
      event.id === id
  );

}



// UPDATE EVENT
export function updateEvent(
  id,
  updatedEvent
) {

  const index =
    mockEventData.findIndex(
      (event) =>
        event.id === id
    );


  if (index === -1) {
    return null;
  }


  mockEventData[index] = {
    ...mockEventData[index],
    ...updatedEvent,
  };


  return mockEventData[index];
}



// DELETE EVENT
export function deleteEvent(id) {

  const index =
    mockEventData.findIndex(
      (event) =>
        event.id === id
    );


  if (index === -1) {
    return false;
  }


  mockEventData.splice(index,1);

  return true;
}