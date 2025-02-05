import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getAllTecnologyCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await prisma.technologyCategory.findMany({
      include: { technologies: true },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTechnologyCategoryById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    const category = await prisma.technologyCategory.findUnique({
      where: { id: categoryId },
      include: { technologies: true },
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createTechnologyCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.technologyCategory.create({
      data: {
        name,
      },
      include: { technologies: true },
    });
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error });
    console.log(error);
  }
};

export const updateTechnologyCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryId = parseInt(id);
  const { name } = req.body;

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    const updatedCategory = await prisma.technologyCategory.update({
      where: { id: categoryId },
      data: { name },
      include: { technologies: true },
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteTechnologyCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    res.status(400).json({ error: "Invalid category ID" });
    return;
  }

  try {
    await prisma.technologyCategory.delete({
      where: { id: categoryId },
    });
    res.status(204).send();
} catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
