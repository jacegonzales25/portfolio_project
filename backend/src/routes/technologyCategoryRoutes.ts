import express from "express";
import {
  getAllTecnologyCategories,
  getTechnologyCategoryById,
  createTechnologyCategory,
  updateTechnologyCategory,
  deleteTechnologyCategory,
} from "../controller/technologyCategoryController";

const router = express.Router();

// Define routes
router.get("/", getAllTecnologyCategories);
router.get("/:id", getTechnologyCategoryById);
router.post("/", createTechnologyCategory);
router.put("/:id", updateTechnologyCategory);
router.delete("/:id", deleteTechnologyCategory);

export { router as technologyCategoryRouter };
