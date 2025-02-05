import express from "express";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controller/experienceController";

const router = express.Router();

// Define routes
router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export { router as experienceRouter };
