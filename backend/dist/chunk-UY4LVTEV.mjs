import {
  prisma
} from "./chunk-HLGKOBBJ.mjs";

// src/routes/send-files.ts
import fastifyMultipart from "fastify-multipart";
import csvParser from "csv-parser";
import { pipeline } from "stream";
import { promisify } from "util";
async function sendFile(app) {
  app.register(fastifyMultipart);
  app.post("/api/files", async (request, reply) => {
    const data = await request.file();
    if (!data) {
      reply.status(400).send({ message: "No file uploaded." });
      return;
    }
    if (data.mimetype !== "text/csv") {
      reply.status(400).send({ message: "Only CSV files are allowed." });
      return;
    }
    const records = [];
    const pipelinePromise = promisify(pipeline);
    try {
      await pipelinePromise(
        data.file,
        csvParser(),
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

export {
  sendFile
};
