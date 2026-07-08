import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

vi.mock(
  "../services/AuthService.js",
  () => ({

    isAuthenticated: vi.fn(),

  })
);

import {
  isAuthenticated,
} from "../services/AuthService.js";

import {
  authenticate,
} from "../middleware/AuthMiddleware.js";

describe(
  "Authentication Middleware",
  () => {

    let req;
    let res;
    let next;

    beforeEach(() => {

      vi.clearAllMocks();

      req = {};

      res = {

        status:
          vi.fn()
          .mockReturnThis(),

        json:
          vi.fn(),

      };

      next =
        vi.fn();

    });

    it(
      "It should allow authenticated users to access protected routes.",
      () => {

        // Arrange

        isAuthenticated
          .mockReturnValue(true);

        // Act

        authenticate(
          req,
          res,
          next
        );

        // Assert

        expect(
          isAuthenticated
        )
        .toHaveBeenCalled();

        expect(
          next
        )
        .toHaveBeenCalled();

        expect(
          res.status
        )
        .not
        .toHaveBeenCalled();

      }
    );

    it(
      "It should block unauthenticated users from accessing protected routes.",
      () => {

        // Arrange

        isAuthenticated
          .mockReturnValue(false);

        // Act

        authenticate(
          req,
          res,
          next
        );

        // Assert

        expect(
          isAuthenticated
        )
        .toHaveBeenCalled();

        expect(
          res.status
        )
        .toHaveBeenCalledWith(
          401
        );

        expect(
          res.json
        )
        .toHaveBeenCalledWith({

          success:false,

          message:
            "Unauthorized.",

        });

        expect(
          next
        )
        .not
        .toHaveBeenCalled();

      }
    );

  }
);