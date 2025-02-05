import express from "express";
import {
    getAllTechnologies,
    getTechnologyById,
    createTechnology,
    updateTechnology,
    deleteTechnology,
} from '../controller/technologyController';

const router = express.Router();

// Define routes
router.get("/", getAllTechnologies);
router.get("/:id", getTechnologyById);
router.post("/", createTechnology);
router.put("/:id", updateTechnology);
router.delete("/:id", deleteTechnology);

export { router as technologyRouter };
