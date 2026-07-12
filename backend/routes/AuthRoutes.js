import express from "express";

import {
  login,
  logout,
  currentUser,
} from "../controllers/AuthController.js";

import {
  authenticate,
} from "../middleware/AuthMiddleware.js";

const router =
  express.Router();

router.post(
  "/login",
  login
);

router.post(
  "/logout",
  authenticate,
  logout
);

router.get(
  "/me",
  authenticate,
  currentUser
);


export default router;