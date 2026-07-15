import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import request from "supertest";

import express from "express";

vi.mock(
  "../../controllers/AuthController.js",
  () => ({

    login:
      (req, res) => {


        const {
          email,
          password,
        } = req.body;

        // Check missing fields

        if (
          !email ||
          !password
        ) {

          return res
            .status(400)
            .json({

              success: false,

              message:
                "Email and password are required.",

            });

        }

        // Check credentials

        if (
          email !== "admin@gmail.com" ||
          password !== "admin123"
        ) {

          return res
            .status(401)
            .json({

              success: false,

              message:
                "Invalid email or password.",

            });

        }

        // Successful login

        return res
          .status(200)
          .json({

            success: true,

            message:
              "Login successful.",

            user: {

              id: 1,

              name:
                "System Administrator",

              email:
                "admin@gmail.com",

              role:
                "admin",

            },

          });

      },


    logout:

      (req, res) => {


        return res
          .status(200)
          .json({

            success: true,

            message:
              "Logout successful.",

          });


      },


    currentUser:

      (req, res) => {


        return res
          .status(200)
          .json({

            success: true,

            user: {

              id: 1,

              name:
                "System Administrator",

              email:
                "admin@gmail.com",

              role:
                "admin",

            },

          });


      },

  })
);




vi.mock(
  "../../middleware/AuthMiddleware.js",
  () => ({

    authenticate:
      (req, res, next) => next(),

  })
);




import AuthRoutes from "../../routes/AuthRoutes.js";



const app = express();


app.use(
  express.json()
);


app.use(
  "/api/auth",
  AuthRoutes
);


describe(
  "Authentication Routes",
  () => {

    it(
      "It should login successfully and retrieve current user through GET /api/auth/me.",
      async () => {

        // Arrange - Login User

        const loginResponse =
          await request(app)
          .post(
            "/api/auth/login"
          )
          .send({

            email:
              "admin@gmail.com",

            password:
              "admin123",

          });

        // Assert Login

        expect(
          loginResponse.status
        )
        .toBe(200);

        expect(
          loginResponse.body.message
        )
        .toBe(
          "Login successful."
        );

        expect(
          loginResponse.body.user.email
        )
        .toBe(
          "admin@gmail.com"
        );


        // Act - Retrieve Current User

        const userResponse =
          await request(app)
          .get(
            "/api/auth/me"
          );

        // Assert Current User

        expect(
          userResponse.status
        )
        .toBe(200);

        expect(
          userResponse.body.user.email
        )
        .toBe(
          "admin@gmail.com"
        );



      }
    );


    it(
      "It should return an error when email or password is missing.",
      async () => {

        // Arrange + Act

        const response =
          await request(app)
          .post(
            "/api/auth/login"
          )
          .send({

            email:
              "",

            password:
              "",

          });

        // Assert

        expect(
          response.status
        )
        .toBe(400);

        expect(
          response.body.message
        )
        .toBe(
          "Email and password are required."
        );


      }
    );


    it(
      "It should return an error when password is incorrect.",
      async () => {


        // Arrange + Act

        const response =
          await request(app)
          .post(
            "/api/auth/login"
          )
          .send({

            email:
              "admin@gmail.com",

            password:
              "wrongpassword",

          });

        // Assert

        expect(
          response.status
        )
        .toBe(401);

        expect(
          response.body.message
        )
        .toBe(
          "Invalid email or password."
        );
      }
    );


    it(
      "It should logout user successfully through POST /api/auth/logout.",
      async () => {

        // Arrange + Act

        const response =
          await request(app)
          .post(
            "/api/auth/logout"
          );

        // Assert

        expect(
          response.status
        )
        .toBe(200);

        expect(
          response.body.message
        )
        .toBe(
          "Logout successful."
        );
      }
    );
  }
);