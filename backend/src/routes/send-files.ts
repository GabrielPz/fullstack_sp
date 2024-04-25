import { FastifyInstance } from "fastify/types/instance";
import csvParser from "csv-parser";
import { pipeline } from "stream";
import { promisify } from "util";
import { prisma } from "../lib/prisma";
import fastifyMultipart from "fastify-multipart";

interface MulterRequest extends Request {
  file: any;
}

export async function sendFile(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    addToBody: true
  });

  app.post("/api/files", async (request, reply) => {
    const data = await (request as unknown as MulterRequest).file;

    if (!data) {
      reply.status(400).send({ message: "No file uploaded." });
      return;
    }

    console.log(data.mimetype);

    if (data.mimetype !== "text/csv") {
      reply.status(400).send({ message: "Only CSV files are allowed." });
      return;
    }

    const records: any[] = [];
    const pipelinePromise = promisify(pipeline);

    try {
      await pipelinePromise(
        data.file,
        csvParser(),
        async function* (source: any) {
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
      reply
        .status(200)
        .send({ message: "The file was uploaded successfully." });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Error saving data to the database." });
    }
  });
}
