import {
  describe,
  it,
  expect,
} from "vitest";


import {
  validateAnnouncement,
} from "../../validation/AnnouncementValidation.js";



describe("Announcement Validation", () => {


  it("should validate announcement successfully when all fields are provided", () => {


    // Arrange
    const announcement = {

      title:
        "Water Interruption Notice",

      content:
        "Water service will be unavailable.",

      publicationDate:
        "2026-07-05",

      relatedEvent:
        "Water System Maintenance",

    };



    // Act
    const result =
      validateAnnouncement(
        announcement
      );



    // Assert
    expect(result)
      .toEqual({

        isValid:true,

        errors:{},

      });


  });




  it("should return error when announcement title is empty", () => {


    // Arrange
    const announcement = {

      title:"",

      content:
        "Water service update.",

      publicationDate:
        "2026-07-05",

      relatedEvent:
        "Maintenance",

    };



    // Act
    const result =
      validateAnnouncement(
        announcement
      );



    // Assert
    expect(result.errors.title)
      .toBe(
        "Announcement title is required."
      );


  });




  it("should return error when announcement content is empty", () => {


    // Arrange
    const announcement = {

      title:
        "Water Notice",

      content:"",

      publicationDate:
        "2026-07-05",

      relatedEvent:
        "Maintenance",

    };



    // Act
    const result =
      validateAnnouncement(
        announcement
      );



    // Assert
    expect(result.errors.content)
      .toBe(
        "Announcement content is required."
      );


  });




  it("should return error when publication date is missing", () => {


    // Arrange
    const announcement = {

      title:
        "Water Notice",

      content:
        "Maintenance update.",

      publicationDate:"",

      relatedEvent:
        "Maintenance",

    };



    // Act
    const result =
      validateAnnouncement(
        announcement
      );



    // Assert
    expect(result.errors.publicationDate)
      .toBe(
        "Publication date is required."
      );


  });




  it("should return error when related event is empty", () => {


    // Arrange
    const announcement = {

      title:
        "Water Notice",

      content:
        "Maintenance update.",

      publicationDate:
        "2026-07-05",

      relatedEvent:"",

    };



    // Act
    const result =
      validateAnnouncement(
        announcement
      );



    // Assert
    expect(result.errors.relatedEvent)
      .toBe(
        "Related event is required."
      );


  });



});