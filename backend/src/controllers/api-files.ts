import { Request as ExpressRequest, Request, Response } from "express";
import csvParser from "csv-parser";
import { pipeline } from "stream";
import { promisify } from "util";
import { prisma } from "../lib/prisma";
import { Readable } from "stream";

import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

interface MulterRequest
  extends ExpressRequest<ParamsDictionary, any, ParsedQs> {
  file?: Express.Multer.File;
}

export const file = async (req: MulterRequest, res: Response) => {
  const data = req.file;

  if (!data) {
    return res.status(400).send({ message: "No file uploaded." });
  }

  if (data.mimetype !== "text/csv") {
    return res.status(400).send({ message: "Only CSV files are allowed." });
  }

  const records: any[] = [];
  const pipelinePromise = promisify(pipeline);

  try {
    const bufferStream = new Readable();
    bufferStream.push(data.buffer);
    bufferStream.push(null);

    await pipelinePromise(
      bufferStream,
      csvParser(),
      async function* (source: any) {
        for await (const row of source) {
          records.push(row);
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error reading the CSV file." });
  }

  try {
    const mappedRecords = records.map((record) => ({
      name: record.nome,
      city: record.cidade,
      country: record.país,
      favorite_sport: record.esporte_favorito
    }));

    await prisma.user.createMany({ data: mappedRecords });
    return res
      .status(200)
      .send({ message: "The file was uploaded successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error saving data to the database." });
  }
};
