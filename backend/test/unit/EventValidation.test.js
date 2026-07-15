import {
  describe,
  it,
  expect,
} from "vitest";

import {
  validateEvent,
} from "../../validation/EventValidation.js";


describe("Event Validation", () => {


  it("should validate event successfully when all fields are provided", () => {

    // Arrange
    const event = {
      title: "Barangay Assembly",
      description:
        "Monthly community meeting.",
      date: "2026-07-10",
      time: "09:00 AM",
      location: "Barangay Hall",
      tags: [
        "Community",
      ],
    };


    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result)
      .toEqual({
        isValid: true,
        errors: {},
      });

  });



  it("should return error when event title is empty", () => {

    // Arrange
    const event = {
      title: "",
      description:
        "Monthly meeting",
      date: "2026-07-10",
      time: "09:00 AM",
      location: "Barangay Hall",
      tags: [
        "Community",
      ],
    };



    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result.isValid)
      .toBe(false);


    expect(result.errors.title)
      .toBe(
        "Event title is required."
      );

  });



  it("should return error when event description is empty", () => {

    // Arrange
    const event = {
      title:
        "Barangay Assembly",
      description: "",
      date:
        "2026-07-10",
      time:
        "09:00 AM",
      location:
        "Barangay Hall",
      tags:[
        "Community",
      ],
    };


    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result.errors.description)
      .toBe(
        "Event description is required."
      );

  });



  it("should return error when event date is missing", () => {

    // Arrange
    const event = {
      title:
        "Barangay Assembly",
      description:
        "Monthly meeting",
      date:"",
      time:
        "09:00 AM",
      location:
        "Barangay Hall",
      tags:[
        "Community",
      ],
    };



    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result.errors.date)
      .toBe(
        "Event date is required."
      );

  });



  it("should return error when event time is missing", () => {

    // Arrange
    const event = {
      title:
        "Barangay Assembly",
      description:
        "Monthly meeting",
      date:
        "2026-07-10",
      time:"",
      location:
        "Barangay Hall",
      tags:[
        "Community",
      ],
    };



    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result.errors.time)
      .toBe(
        "Event time is required."
      );

  });



  it("should return error when event location is empty", () => {

    // Arrange
    const event = {
      title:
        "Barangay Assembly",
      description:
        "Monthly meeting",
      date:
        "2026-07-10",
      time:
        "09:00 AM",
      location:"",
      tags:[
        "Community",
      ],
    };



    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result.errors.location)
      .toBe(
        "Event location is required."
      );

  });



  it("should return error when event tags are empty", () => {

    // Arrange
    const event = {
      title:
        "Barangay Assembly",
      description:
        "Monthly meeting",
      date:
        "2026-07-10",
      time:
        "09:00 AM",
      location:
        "Barangay Hall",
      tags:[],
    };



    // Act
    const result =
      validateEvent(event);



    // Assert
    expect(result.errors.tags)
      .toBe(
        "At least one event tag is required."
      );

  });


});