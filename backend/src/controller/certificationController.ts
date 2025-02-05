import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Get all certifications
export const getAllCertifications = async (req: Request, res: Response) => {
  try {
    const certifications = await prisma.certification.findMany();
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCertificationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const certificationId = parseInt(id);

  if (isNaN(certificationId)) {
    res.status(400).json({ error: "Invalid certification ID" });
    return;
  }

  try {
    const certification = await prisma.certification.findUnique({
      where: { id: certificationId },
    });

    if (!certification) {
      res.status(404).json({ error: "Certification not found" });
      return;
    }

    res.json(certification);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  const { title, issuer, description, issueDate, credentialId, url } = req.body; // Fix here
  try {
    const newCertification = await prisma.certification.create({
      data: {
        title,
        issuer,
        description,
        issueDate,
        credentialId, // Fix here
        url,
      },
    });
    res.json(newCertification);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const certificationId = parseInt(id);
  const { title, issuer, description, issueDate, credentialId, url } = req.body; // Fix here

  if (isNaN(certificationId)) {
    res.status(400).json({ error: "Invalid certification ID" });
    return;
  }

  try {
    const updatedCertification = await prisma.certification.update({
      where: { id: certificationId },
      data: {
        title,
        issuer,
        description,
        issueDate,
        credentialId, // Fix here
        url,
      },
    });
    res.json(updatedCertification);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
