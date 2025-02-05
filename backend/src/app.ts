import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { technologyRouter } from "./routes/technologyRoutes";
import { projectRouter } from "./routes/projectRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/technologies", technologyRouter);
app.use("/projects", projectRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
