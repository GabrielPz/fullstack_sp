import {
  getFile
} from "./chunk-EMT5I2DS.mjs";
import {
  sendFile
} from "./chunk-UY4LVTEV.mjs";
import "./chunk-HLGKOBBJ.mjs";

// src/server.ts
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(getFile);
app.register(sendFile);
app.listen({ port: 3e3, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 3333");
});
