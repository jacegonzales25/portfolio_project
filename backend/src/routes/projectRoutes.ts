import * as express from "express";
import { getAllProjects, createProject } from "../controller/projectController";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", createProject);

export { router as projectRouter };
