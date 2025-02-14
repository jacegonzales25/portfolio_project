import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { technologyRouter } from "./routes/technologyRoutes";
import { projectRouter } from "./routes/projectRoutes";
import { experienceRouter } from './routes/experienceRoutes';
import { certificationRouter } from './routes/certificationRoutes';
import { technologyCategoryRouter } from './routes/technologyCategoryRoutes';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/technologies", technologyRouter);
app.use("/projects", projectRouter);
app.use("/experiences", experienceRouter);
app.use("/certifications", certificationRouter);
app.use("/technology-categories", technologyCategoryRouter);

const PORT = parseInt(process.env.PORT as string, 10) || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
