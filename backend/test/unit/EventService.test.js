import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";


vi.mock("../../models/EventModel.js", () => ({
  insertEvent: vi.fn(),
  getEvents: vi.fn(),
  findEventById: vi.fn(),
  updateEvent: vi.fn(),
  deleteEvent: vi.fn(),
}));


vi.mock("../../validation/EventValidation.js", () => ({
  validateEvent: vi.fn(),
}));


import * as eventModel from "../../models/EventModel.js";

import * as eventValidation from "../../validation/EventValidation.js";


import {
  createEvent,
  readEvents,
  searchEvent,
  editEvent,
  removeEvent,
} from "../../services/EventService.js";



describe("Event Service", () => {


  beforeEach(() => {
    vi.clearAllMocks();
  });



  describe("Create Event", () => {


    it("should create event successfully", () => {

      // Arrange
      const mockEvent = {
        id: 1,
        title: "Barangay Assembly",
        description:
          "Monthly community meeting.",
        date: "2026-07-10",
        time: "09:00 AM",
        location: "Barangay Hall",
        tags: [
          "Community",
        ],
        status: "Upcoming",
      };


      eventValidation
        .validateEvent
        .mockReturnValue({
          isValid: true,
          errors: {},
        });


      eventModel
        .insertEvent
        .mockReturnValue(
          mockEvent
        );


      // Act
      const result =
        createEvent(mockEvent);



      // Assert
      expect(result)
        .toEqual(mockEvent);


      expect(
        eventValidation.validateEvent
      )
      .toHaveBeenCalledWith(
        mockEvent
      );


      expect(
        eventModel.insertEvent
      )
      .toHaveBeenCalledOnce();


    });


  });




  describe("Read Events", () => {


    it("should return all event records", () => {


      // Arrange
      const mockEvents = [
        {
          id: 1,
          title:
            "Water System Maintenance",
        },
      ];


      eventModel
        .getEvents
        .mockReturnValue(
          mockEvents
        );



      // Act
      const result =
        readEvents();



      // Assert
      expect(result)
        .toEqual(mockEvents);


      expect(
        eventModel.getEvents
      )
      .toHaveBeenCalledOnce();


    });


  });




  describe("Search Event", () => {


    it("should return event when id exists", () => {


      // Arrange
      const mockEvent = {
        id: 1,
        title:
          "Barangay Assembly",
      };


      eventModel
        .findEventById
        .mockReturnValue(
          mockEvent
        );


      // Act
      const result =
        searchEvent(1);



      // Assert
      expect(result)
        .toEqual(mockEvent);


      expect(
        eventModel.findEventById
      )
      .toHaveBeenCalledWith(1);


    });



    it("should throw error when event does not exist", () => {


      // Arrange
      eventModel
        .findEventById
        .mockReturnValue(
          null
        );


      // Act + Assert
      expect(() =>
        searchEvent(999)
      )
      .toThrow(
        "Event not found."
      );


    });


  });




  describe("Update Event", () => {


    it("should update event successfully", () => {


      // Arrange
      const updatedEvent = {
        id: 1,
        title:
          "Updated Event",
        description:
          "Updated description",
        date:
          "2026-07-20",
        time:
          "10:00 AM",
        location:
          "Barangay Hall",
        tags:
          [
            "Community"
          ],
        status:
          "Upcoming",
      };



      eventModel
        .findEventById
        .mockReturnValue(
          updatedEvent
        );


      eventValidation
        .validateEvent
        .mockReturnValue({
          isValid: true,
          errors: {},
        });



      eventModel
        .updateEvent
        .mockReturnValue(
          updatedEvent
        );



      // Act
      const result =
        editEvent(
          1,
          updatedEvent
        );



      // Assert
      expect(result)
        .toEqual(
          updatedEvent
        );


      expect(
        eventModel.findEventById
      )
      .toHaveBeenCalledWith(1);


      expect(
        eventModel.updateEvent
      )
      .toHaveBeenCalledWith(
        1,
        updatedEvent
      );


    });



    it("should throw error when event does not exist", () => {


      // Arrange
      eventModel
        .findEventById
        .mockReturnValue(
          null
        );



      // Act + Assert
      expect(() =>
        editEvent(
          999,
          {
            title:
              "Invalid",
          }
        )
      )
      .toThrow(
        "Event not found."
      );


    });


  });




  describe("Delete Event", () => {


    it("should delete event successfully", () => {


      // Arrange
      eventModel
        .findEventById
        .mockReturnValue({
          id:1,
          title:
            "Barangay Assembly",
        });


      eventModel
        .deleteEvent
        .mockReturnValue(
          true
        );



      // Act
      const result =
        removeEvent(1);



      // Assert
      expect(result)
      .toEqual({
        message:
          "Event deleted successfully.",
      });



      expect(
        eventModel.findEventById
      )
      .toHaveBeenCalledWith(1);



      expect(
        eventModel.deleteEvent
      )
      .toHaveBeenCalledWith(1);



    });




    it("should throw error when event does not exist", () => {


      // Arrange
      eventModel
        .findEventById
        .mockReturnValue(
          null
        );



      // Act + Assert
      expect(() =>
        removeEvent(999)
      )
      .toThrow(
        "Event not found."
      );


    });


  });


});