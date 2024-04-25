"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/routes/send-files.ts
var import_csv_parser = __toESM(require("csv-parser"));
var import_stream = require("stream");
var import_util = require("util");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({});

// src/routes/send-files.ts
async function sendFile(app2) {
  app2.post("/api/files", async (request, reply) => {
    const data = await request.file;
    if (!data) {
      reply.status(400).send({ message: "No file uploaded." });
      return;
    }
    if (data.mimetype !== "text/csv") {
      reply.status(400).send({ message: "Only CSV files are allowed." });
      return;
    }
    const records = [];
    const pipelinePromise = (0, import_util.promisify)(import_stream.pipeline);
    try {
      await pipelinePromise(
        data.file,
        (0, import_csv_parser.default)(),
        async function* (source) {
          for await (const row of source) {
            records.push(row);
          }
        }
      );
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Error reading the CSV file." });
      return;
    }
    try {
      await prisma.user.createMany({ data: records });
      reply.status(200).send({ message: "The file was uploaded successfully." });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Error saving data to the database." });
    }
  });
}

// src/routes/api-usuarios.ts
async function getFile(app2) {
  app2.get("/api/usuarios", async (request, reply) => {
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

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "*"
});
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(getFile);
app.register(sendFile);
app.listen({ port: 3e3, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 3333");
});
