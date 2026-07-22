import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  listEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", listEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
