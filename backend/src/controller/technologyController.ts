import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getAllTechnologies = async (req: Request, res: Response) => {
  try {
    const technologies = await prisma.technology.findMany({
      include: { category: true },
    });
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTechnologyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const technologyId = parseInt(id);

  if (isNaN(technologyId)) {
    res.status(400).json({ error: "Invalid technology ID" });
    return;
  }

  try {
    const technology = await prisma.technology.findUnique({
      where: { id: technologyId },
      include: { category: true },
    });

    if (!technology) {
      res.status(404).json({ error: "Technology not found" });
      return;
    }

    res.json(technology);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createTechnology = async (req: Request, res: Response) => {
  const { name, technologyCategoryId } = req.body;
  try {
    const newTechnology = await prisma.technology.create({
      data: {
        name,
        technologyCategoryId,
      },
      include: { category: true },
    });
    res.json(newTechnology);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateTechnology = async (req: Request, res: Response) => {
  const { id } = req.params;
  const technologyId = parseInt(id);
  const { name, categoryId } = req.body;

  if (isNaN(technologyId)) {
    res.status(400).json({ error: "Invalid technology ID" });
    return;
  }

  try {
    const updatedTechnology = await prisma.technology.update({
      where: { id: technologyId },
      data: {
        name,
        categoryId,
      },
      include: { category: true },
    });

    res.json(updatedTechnology);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteTechnology = async (req: Request, res: Response) => {
  const { id } = req.params;
  const technologyId = parseInt(id);

  if (isNaN(technologyId)) {
    res.status(400).json({ error: "Invalid technology ID" });
    return;
  }

  try {
    await prisma.technology.delete({
      where: { id: technologyId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
