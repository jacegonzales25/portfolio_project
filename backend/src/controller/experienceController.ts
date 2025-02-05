import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Get all experiences
export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getExperienceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const experienceId = parseInt(id);

  if (isNaN(experienceId)) {
    res.status(400).json({ error: "Invalid experience ID" });
    return;
  }

  try {
    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience) {
      res.status(404).json({ error: "Experience not found" });
      return;
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create a new experience
export const createExperience = async (req: Request, res: Response) => {
  const { company, title, startDate, endDate, current, responsibilities } =
    req.body;
  try {
    const newExperience = await prisma.experience.create({
      data: {
        company,
        title,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        responsibilities: JSON.stringify(responsibilities),
      },
    });
    res.json({
      ...newExperience,
      responsibilities: JSON.parse(newExperience.responsibilities),
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update an experience

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const experienceId = parseInt(id);
  const { company, title, startDate, endDate, current, responsibilities } =
    req.body;

  if (isNaN(experienceId)) {
    res.status(400).json({ error: "Invalid experience ID" });
    return;
  }

  try {
    const updatedExperience = await prisma.experience.update({
      where: { id: experienceId },
      data: {
        company,
        title,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        responsibilities: JSON.stringify(responsibilities),
      },
    });
    res.json({
      ...updatedExperience,
      responsibilities: JSON.parse(updatedExperience.responsibilities),
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete an experience
export const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const experienceId = parseInt(id);

  if (isNaN(experienceId)) {
    res.status(400).json({ error: "Invalid experience ID" });
    return;
  }

  try {
    await prisma.experience.delete({
      where: { id: experienceId },
    });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
