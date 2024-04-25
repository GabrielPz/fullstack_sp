import {
  prisma
} from "./chunk-HLGKOBBJ.mjs";

// src/routes/api-usuarios.ts
async function getFile(app) {
  app.withTypeProvider().get("/api/usuarios", async (request, reply) => {
    try {
      const q = request.query.q || "";
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { city: { contains: q, mode: "insensitive" } },
            { country: { contains: q, mode: "insensitive" } },
            { favorite_sport: { contains: q, mode: "insensitive" } }
          ]
        }
      });
      reply.status(200).send({ data: users });
    } catch (error) {
      if (error instanceof Error) {
        reply.status(500).send({ message: error.message });
      } else {
        reply.status(500).send({ message: "An unexpected error occurred." });
      }
    }
  });
}

export {
  getFile
};
