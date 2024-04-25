"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/send-files.ts
var send_files_exports = {};
__export(send_files_exports, {
  sendFile: () => sendFile
});
module.exports = __toCommonJS(send_files_exports);
var import_csv_parser = __toESM(require("csv-parser"));
var import_stream = require("stream");
var import_util = require("util");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({});

// src/routes/send-files.ts
async function sendFile(app) {
  app.post("/api/files", async (request, reply) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendFile
});
