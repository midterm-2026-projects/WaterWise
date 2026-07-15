import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";


import {
  loginUser,
  logoutUser,
  clearSession,
} from "../../services/AuthService.js";

describe(
  "Logout Service",
  () => {

    beforeEach(() => {

      clearSession();

    });


    it(
      "It should logout successfully.",
      async()=>{

        // Arrange

        await loginUser({

          email:
            "admin@gmail.com",

          password:
            "admin123",

        });

        // Act

        const result =
          await logoutUser();

        // Assert

        expect(result.message)
          .toBe(
            "Logout successful."
          );

      }
    );


    it(
      "It should throw an error when there is no active session.",
      async()=>{

        // Arrange

        clearSession();

        // Act + Assert

        await expect(
          logoutUser()
        )
        .rejects
        .toThrow(
          "No active session."
        );

      }
    );

  }
);