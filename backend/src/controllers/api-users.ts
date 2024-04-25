import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const apiUser = async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string) || "";
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { city: { contains: q } },
          { country: { contains: q } },
          { favorite_sport: { contains: q } }
        ]
      }
    });
    return res.status(200).send({ data: users });
  } catch (error) {
    return res.status(500).send({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred."
    });
  }
};
