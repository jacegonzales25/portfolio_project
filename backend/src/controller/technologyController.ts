import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const technologyController = {
  async getTechnologies(req: Request, res: Response) {
    try {
      const technologies = await prisma.technology.findMany({
        include: { category: true },
      });
      res.json(technologies);
    } catch (error) {
      res.status(500).json({ error: "Error fetching technologies" });
    }
  },
};
