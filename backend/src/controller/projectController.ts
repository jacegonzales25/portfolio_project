import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { technologies: { include: { technology: true } } },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get a project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { technologies: { include: { technology: true } } },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
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
      include: { technologies: { include: { technology: true } } },
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
    await prisma.projectTechnology.deleteMany({
      where: { projectId: parseInt(id) },
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
      include: { technologies: { include: { technology: true } } },
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
    // First, delete related project-technologies records
    await prisma.projectTechnology.deleteMany({
      where: { projectId: parseInt(id) },
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