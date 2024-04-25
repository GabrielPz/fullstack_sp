"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/api-usuarios.ts
var api_usuarios_exports = {};
__export(api_usuarios_exports, {
  getFile: () => getFile
});
module.exports = __toCommonJS(api_usuarios_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({});

// src/routes/api-usuarios.ts
async function getFile(app) {
  app.get("/api/usuarios", async (request, reply) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFile
});
