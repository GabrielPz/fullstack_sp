import { Router } from "express";
import * as filesController from "../controllers/api-files";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const filesRoutes = Router();

filesRoutes.post("/api/files", upload.single("file"), filesController.file);

export default filesRoutes;
