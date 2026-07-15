import express from "express";
import request from "supertest";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import router from "../routes/meterReading.routes.js";

import {
  fetchMeterReadings,
  fetchMeterReadingById,
  addMeterReading,
  editMeterReading,
  removeMeterReading,
} from "../services/meterReading.service.js";

vi.mock("../services/meterReading.service.js", () => ({
  fetchMeterReadings: vi.fn(),
  fetchMeterReadingById: vi.fn(),
  addMeterReading: vi.fn(),
  editMeterReading: vi.fn(),
  removeMeterReading: vi.fn(),
}));

const app = express();

app.use(express.json());
app.use("/", router);


describe(
  "Meter Reading Controller",
  () => {

    beforeEach(() => {
      vi.clearAllMocks();
    });


    describe(
      "GET /meter-readings",
      () => {

        it(
          "should return all meter readings",
          async () => {

            // Arrange
            const readings = [
              {
                id: 1,
                consumerName:
                  "Juan",
              },
            ];

            fetchMeterReadings.mockReturnValue(
              readings
            );


            // Act
            const response =
              await request(app)
                .get(
                  "/meter-readings"
                );


            // Assert
            expect(
              response.status
            ).toBe(200);

            expect(
              response.body
            ).toEqual(
              readings
            );
          }
        );


        it(
          "should return 500 when service throws",
          async () => {

            // Arrange
            fetchMeterReadings.mockImplementation(
              () => {
                throw new Error(
                  "Server Error"
                );
              }
            );


            // Act
            const response =
              await request(app)
                .get(
                  "/meter-readings"
                );


            // Assert
            expect(
              response.status
            ).toBe(500);

            expect(
              response.body
            ).toEqual({
              message:
                "Server Error",
            });
          }
        );

      }
    );


    describe(
      "GET /meter-readings/:id",
      () => {

        it(
          "should return a meter reading",
          async () => {

            // Arrange
            const reading = {
              id: 1,
              consumerName:
                "Juan",
            };

            fetchMeterReadingById.mockReturnValue(
              reading
            );


            // Act
            const response =
              await request(app)
                .get(
                  "/meter-readings/1"
                );


            // Assert
            expect(
              response.status
            ).toBe(200);

            expect(
              response.body
            ).toEqual(
              reading
            );
          }
        );


        it(
          "should return 404 when record is not found",
          async () => {

            // Arrange
            fetchMeterReadingById.mockImplementation(
              () => {
                throw new Error(
                  "Meter reading not found."
                );
              }
            );


            // Act
            const response =
              await request(app)
                .get(
                  "/meter-readings/99"
                );


            // Assert
            expect(
              response.status
            ).toBe(404);

            expect(
              response.body
            ).toEqual({
              message:
                "Meter reading not found.",
            });
          }
        );


        it(
          "should return 500 when service throws",
          async () => {

            // Arrange
            fetchMeterReadingById.mockImplementation(
              () => {
                throw new Error(
                  "Server Error"
                );
              }
            );


            // Act
            const response =
              await request(app)
                .get(
                  "/meter-readings/1"
                );


            // Assert
            expect(
              response.status
            ).toBe(500);

            expect(
              response.body
            ).toEqual({
              message:
                "Server Error",
            });
          }
        );

      }
    );


    describe(
      "POST /meter-readings",
      () => {

        it(
          "should create a meter reading",
          async () => {

            // Arrange
            const payload = {
              consumerNo:
                "C-1001",
            };


            addMeterReading.mockReturnValue({
              id: 1,
              ...payload,
            });


            // Act
            const response =
              await request(app)
                .post(
                  "/meter-readings"
                )
                .send(
                  payload
                );


            // Assert
            expect(
              response.status
            ).toBe(201);

            expect(
              response.body
            ).toEqual({
              message:
                "Meter reading created successfully.",
              data:{
                id:1,
                ...payload,
              },
            });
          }
        );


        it(
          "should return 400 when validation fails",
          async () => {

            // Arrange
            addMeterReading.mockImplementation(
              () => {
                throw {
                  status:400,
                  errors:{
                    consumerNo:
                      "Required",
                  },
                };
              }
            );


            // Act
            const response =
              await request(app)
                .post(
                  "/meter-readings"
                )
                .send({});


            // Assert
            expect(
              response.status
            ).toBe(400);
          }
        );


        it(
          "should return 500 when service throws",
          async () => {

            // Arrange
            addMeterReading.mockImplementation(
              () => {
                throw new Error(
                  "Server Error"
                );
              }
            );


            // Act
            const response =
              await request(app)
                .post(
                  "/meter-readings"
                )
                .send({});


            // Assert
            expect(
              response.status
            ).toBe(500);
          }
        );

      }
    );
    
    describe(
      "PUT /meter-readings/:id",
      () => {

        it(
          "should update a meter reading",
          async () => {

            // Arrange
            const payload = {
              consumerName:
                "Updated Consumer",
            };


            editMeterReading.mockReturnValue({
              id: 1,
              ...payload,
            });


            // Act
            const response =
              await request(app)
                .put(
                  "/meter-readings/1"
                )
                .send(
                  payload
                );


            // Assert
            expect(
              response.status
            ).toBe(200);

            expect(
              response.body
            ).toEqual({
              message:
                "Meter reading updated successfully.",
              data:{
                id:1,
                ...payload,
              },
            });
          }
        );


        it(
          "should return 400 when validation fails",
          async () => {

            // Arrange
            editMeterReading.mockImplementation(
              () => {
                throw {
                  status:400,
                  errors:{
                    currentReading:
                      "Current reading is required.",
                  },
                };
              }
            );


            // Act
            const response =
              await request(app)
                .put(
                  "/meter-readings/1"
                )
                .send({});


            // Assert
            expect(
              response.status
            ).toBe(400);

            expect(
              response.body
            ).toEqual({
              message:
                "Validation failed.",
              errors:{
                currentReading:
                  "Current reading is required.",
              },
            });
          }
        );


        it(
          "should return 404 when record is not found",
          async () => {

            // Arrange
            editMeterReading.mockImplementation(
              () => {
                throw new Error(
                  "Meter reading not found."
                );
              }
            );


            // Act
            const response =
              await request(app)
                .put(
                  "/meter-readings/1"
                )
                .send({});


            // Assert
            expect(
              response.status
            ).toBe(404);

            expect(
              response.body
            ).toEqual({
              message:
                "Meter reading not found.",
            });
          }
        );


        it(
          "should return 500 when service throws",
          async () => {

            // Arrange
            editMeterReading.mockImplementation(
              () => {
                throw new Error(
                  "Server Error"
                );
              }
            );


            // Act
            const response =
              await request(app)
                .put(
                  "/meter-readings/1"
                )
                .send({
                  consumerName:
                    "Updated",
                });


            // Assert
            expect(
              response.status
            ).toBe(500);

            expect(
              response.body
            ).toEqual({
              message:
                "Server Error",
            });
          }
        );

      }
    );


    describe(
      "DELETE /meter-readings/:id",
      () => {

        it(
          "should delete a meter reading",
          async () => {

            // Arrange
            removeMeterReading.mockReturnValue({
              message:
                "Meter reading deleted successfully.",
            });


            // Act
            const response =
              await request(app)
                .delete(
                  "/meter-readings/1"
                );


            // Assert
            expect(
              response.status
            ).toBe(200);

            expect(
              response.body
            ).toEqual({
              message:
                "Meter reading deleted successfully.",
            });
          }
        );


        it(
          "should return 404 when record is not found",
          async () => {

            // Arrange
            removeMeterReading.mockImplementation(
              () => {
                throw new Error(
                  "Meter reading not found."
                );
              }
            );


            // Act
            const response =
              await request(app)
                .delete(
                  "/meter-readings/1"
                );


            // Assert
            expect(
              response.status
            ).toBe(404);

            expect(
              response.body
            ).toEqual({
              message:
                "Meter reading not found.",
            });
          }
        );


        it(
          "should return 500 when service throws",
          async () => {

            // Arrange
            removeMeterReading.mockImplementation(
              () => {
                throw new Error(
                  "Server Error"
                );
              }
            );


            // Act
            const response =
              await request(app)
                .delete(
                  "/meter-readings/1"
                );


            // Assert
            expect(
              response.status
            ).toBe(500);

            expect(
              response.body
            ).toEqual({
              message:
                "Server Error",
            });
          }
        );

      }
    );

  }
);