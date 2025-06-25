import express from "express";
import {
  addClass,
  getClassesByCourse,
  toggleClassDone,
  getUserSchedule
} from "../controllers/classesController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, addClass);
router.get("/:courseId", requireAuth, getClassesByCourse);
router.patch("/:id/toggle", requireAuth, toggleClassDone);
router.get("/schedule/user", requireAuth, getUserSchedule);

export default router;