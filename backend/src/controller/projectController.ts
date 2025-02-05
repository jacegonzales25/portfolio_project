import { Request, Response } from 'express';
import { prisma } from "../prisma/client";

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { technologies: { include: { category: true } } },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    res.status(400).json({ error: 'Invalid project ID' });
    return;
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        technologies: {
          include: {
            category: true
          },
        },
      },
          });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

  
// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { title, description, image, githubLink, externalLink, technologies } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image,
        githubLink,
        externalLink,
        technologies: {
          create: technologies.map((techId: number) => ({
            technology: { connect: { id: techId } },
          })),
        },
      },
      include: {
        technologies: {
          include: {
            category: true, 
          },
        },
      },
          });
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Update a project by ID
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, image, githubLink, externalLink, technologies } = req.body;
  try {
    // First, delete existing project-technologies relationships
    await prisma.technology.deleteMany({
      where: {
        projects: {
          some: { id: parseInt(id) }, // Delete technologies associated with the project
        },
      },
    });

    // Then, update the project and create new relationships
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image,
        githubLink,
        externalLink,
        technologies: {
          create: technologies.map((techId: number) => ({
            technology: { connect: { id: techId } },
          })),
        },
      },
      include: { technologies: { include: { category: true } } },
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete a project by ID
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // First, delete the project-technology associations
    await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        technologies: {
          deleteMany: {}, // Deletes all technologies related to this project
        },
      },
    });

    // Then, delete the project
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
