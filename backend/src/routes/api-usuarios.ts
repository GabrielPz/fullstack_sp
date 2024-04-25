import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify/types/instance";

export async function getFile(app: FastifyInstance) {
  app
    .get("/api/usuarios", async (request, reply) => {
      try {
        const q = (request.query as { q?: string }).q || "";
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
        reply.status(200).send({ data: users });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply.status(500).send({ message: error.message });
        } else {
          reply.status(500).send({ message: "An unexpected error occurred." });
        }
      }
    });
};
