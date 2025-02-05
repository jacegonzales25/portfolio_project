import * as express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controller/projectController';

const router = express.Router();

// GET /projects
router.get('/', getAllProjects);

// GET /projects/:id
router.get('/:id', getProjectById);

// POST /projects
router.post('/', createProject);

// PUT /projects/:id
router.put('/:id', updateProject);

// DELETE /projects/:id
router.delete('/:id', deleteProject);
export { router as projectRouter };
