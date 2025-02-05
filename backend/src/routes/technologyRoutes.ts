import * as express from "express";
import { technologyController } from "../controller/technology.controller";

const router = express.Router();

router.get("/", technologyController.getTechnologies);

export { router as technologyRouter };
