import { Express } from "express";
import { IndexController } from "../controllers/index";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export function setRoutes(app: Express) {
  const indexController = new IndexController();

  app.get("/api", indexController.home);
  app.post("/api/import", upload.single("filename"), indexController.importRepositories);
  app.get("/api/repositories", indexController.getImportedRepositories);
}
