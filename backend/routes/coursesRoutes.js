import express from "express";
import {
  createCourse,
  getUserCourses,
  getCourseById,
  getCourseProgress 
} from "../controllers/coursesController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, createCourse);
router.get("/", requireAuth, getUserCourses);
router.get("/:id", requireAuth, getCourseById);
router.get("/:id/progress", requireAuth, getCourseProgress);

export default router;