import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { sendFile } from "./routes/send-files";
import { getFile } from "./routes/api-usuarios";
import fastifyMultipart from "fastify-multipart";

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getFile);
app.register(fastifyMultipart, {
  addToBody: true
});
app.register(sendFile);

app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 3333");
});