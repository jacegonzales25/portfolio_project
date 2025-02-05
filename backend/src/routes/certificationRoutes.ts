import express from "express";
import {
  getAllCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controller/certificationController";

const router = express.Router();

// Define routes
router.get("/", getAllCertifications);
router.get("/:id", getCertificationById);
router.post("/", createCertification);
router.put("/:id", updateCertification);
router.delete("/:id", deleteCertification);

export { router as certificationRouter };
