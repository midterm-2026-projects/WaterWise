import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  loginUser,
  clearSession,
} from "../../services/AuthService.js";

describe(
  "Login Service",
  () => {

    beforeEach(() => {

      clearSession();

    });


    it(
      "It should login successfully using valid credentials.",
      async()=>{

        // Arrange

        const credentials = {

          email:
            "admin@gmail.com",

          password:
            "admin123",

        };

        // Act

        const result =
          await loginUser(
            credentials
          );

        // Assert

        expect(result.email)
          .toBe(
            "admin@gmail.com"
          );

        expect(result.role)
          .toBe(
            "admin"
          );

      }
    );

    it(
      "It should throw an error for invalid email.",
      async()=>{


        // Arrange

        const credentials = {

          email:
            "wrong@gmail.com",

          password:
            "admin123",

        };

        // Act + Assert

        await expect(
          loginUser(credentials)
        )
        .rejects
        .toThrow(
          "Invalid email or password."
        );

      }
    );

    it(
      "It should throw an error for invalid password.",
      async()=>{

        // Arrange

        const credentials = {

          email:
            "admin@gmail.com",

          password:
            "wrongpassword",

        };

        // Act + Assert

        await expect(
          loginUser(credentials)
        )
        .rejects
        .toThrow(
          "Invalid email or password."
        );

      }
    );

  }
);