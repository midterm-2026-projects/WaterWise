import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";



vi.mock("../../models/AnnouncementModel.js", () => ({
  insertAnnouncement: vi.fn(),
  getAnnouncements: vi.fn(),
  findAnnouncementById: vi.fn(),
  updateAnnouncement: vi.fn(),
  deleteAnnouncement: vi.fn(),
}));



vi.mock("../../validation/AnnouncementValidation.js", () => ({
  validateAnnouncement: vi.fn(),
}));



import * as announcementModel from "../../models/AnnouncementModel.js";

import * as announcementValidation from "../../validation/AnnouncementValidation.js";


import {
  createAnnouncement,
  readAnnouncements,
  searchAnnouncement,
  editAnnouncement,
  removeAnnouncement,
} from "../../services/AnnouncementService.js";



describe("Announcement Service", () => {


  beforeEach(() => {

    vi.clearAllMocks();

  });



  describe("Create Announcement", () => {


    it("should create announcement successfully", () => {

      // Arrange

      const mockAnnouncement = {
        id: 1,
        title: "Water Interruption Notice",
        content:
          "Water service unavailable tomorrow.",
        publicationDate:
          "2026-07-05",
        relatedEvent:
          "Water System Maintenance",
        status:
          "Published",
      };


      announcementValidation
        .validateAnnouncement
        .mockReturnValue({
          isValid: true,
          errors: {},
        });


      announcementModel
        .insertAnnouncement
        .mockReturnValue(
          mockAnnouncement
        );



      // Act

      const result =
        createAnnouncement(
          mockAnnouncement
        );



      // Assert

      expect(result)
        .toEqual(mockAnnouncement);


      expect(
        announcementValidation
          .validateAnnouncement
      )
        .toHaveBeenCalledWith(
          mockAnnouncement
        );


      expect(
        announcementModel
          .insertAnnouncement
      )
        .toHaveBeenCalledOnce();


    });



    it("should throw error when announcement validation fails", () => {


      // Arrange

      const invalidAnnouncement = {
        title: "",
        content: "",
      };


      announcementValidation
        .validateAnnouncement
        .mockReturnValue({
          isValid: false,
          errors: {
            title:
              "Announcement title is required.",
          },
        });



      // Act + Assert

      expect(() =>
        createAnnouncement(
          invalidAnnouncement
        )
      )
      .toThrow();


    });


  });




  describe("Read Announcements", () => {


    it("should return all announcements", () => {


      // Arrange

      const mockAnnouncements = [
        {
          id: 1,
          title:
            "Barangay Assembly Reminder",
        },
      ];


      announcementModel
        .getAnnouncements
        .mockReturnValue(
          mockAnnouncements
        );



      // Act

      const result =
        readAnnouncements();



      // Assert

      expect(result)
        .toEqual(
          mockAnnouncements
        );


      expect(
        announcementModel
          .getAnnouncements
      )
        .toHaveBeenCalledOnce();


    });


  });




  describe("Search Announcement", () => {


    it("should return announcement when ID exists", () => {


      // Arrange

      const mockAnnouncement = {
        id: 1,
        title:
          "Water Interruption Notice",
      };


      announcementModel
        .findAnnouncementById
        .mockReturnValue(
          mockAnnouncement
        );



      // Act

      const result =
        searchAnnouncement(1);



      // Assert

      expect(result)
        .toEqual(
          mockAnnouncement
        );


      expect(
        announcementModel
          .findAnnouncementById
      )
        .toHaveBeenCalledWith(1);


    });




    it("should throw error when announcement does not exist", () => {


      // Arrange

      announcementModel
        .findAnnouncementById
        .mockReturnValue(null);



      // Act + Assert

      expect(() =>
        searchAnnouncement(999)
      )
      .toThrow(
        "Announcement not found."
      );


    });


  });




  describe("Update Announcement", () => {


    it("should update announcement successfully", () => {


      // Arrange

      const updatedAnnouncement = {
        id: 1,
        title:
          "Updated Announcement",
        content:
          "Updated content",
        publicationDate:
          "2026-07-10",
        relatedEvent:
          "Barangay Assembly",
        status:
          "Published",
      };



      announcementModel
        .findAnnouncementById
        .mockReturnValue(
          updatedAnnouncement
        );



      announcementValidation
        .validateAnnouncement
        .mockReturnValue({
          isValid: true,
          errors: {},
        });



      announcementModel
        .updateAnnouncement
        .mockReturnValue(
          updatedAnnouncement
        );



      // Act

      const result =
        editAnnouncement(
          1,
          updatedAnnouncement
        );



      // Assert

      expect(result)
        .toEqual(
          updatedAnnouncement
        );


      expect(
        announcementModel
          .findAnnouncementById
      )
        .toHaveBeenCalledWith(1);


      expect(
        announcementModel
          .updateAnnouncement
      )
        .toHaveBeenCalledWith(
          1,
          updatedAnnouncement
        );


    });



    it("should not update missing announcement", () => {


      // Arrange

      announcementModel
        .findAnnouncementById
        .mockReturnValue(null);



      // Act + Assert

      expect(() =>
        editAnnouncement(
          999,
          {
            title:
              "Invalid",
          }
        )
      )
      .toThrow(
        "Announcement not found."
      );


    });


  });




  describe("Delete Announcement", () => {


    it("should delete announcement successfully", () => {


      // Arrange

      announcementModel
        .findAnnouncementById
        .mockReturnValue({
          id: 1,
          title:
            "Announcement",
        });



      announcementModel
        .deleteAnnouncement
        .mockReturnValue(true);



      // Act

      const result =
        removeAnnouncement(1);



      // Assert

      expect(result)
        .toEqual({
          message:
            "Announcement deleted successfully.",
        });



      expect(
        announcementModel
          .findAnnouncementById
      )
        .toHaveBeenCalledWith(1);



      expect(
        announcementModel
          .deleteAnnouncement
      )
        .toHaveBeenCalledWith(1);


    });




    it("should not delete missing announcement", () => {


      // Arrange

      announcementModel
        .findAnnouncementById
        .mockReturnValue(null);



      // Act + Assert

      expect(() =>
        removeAnnouncement(999)
      )
      .toThrow(
        "Announcement not found."
      );


    });


  });


});