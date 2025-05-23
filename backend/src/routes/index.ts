import { Express } from "express";
import { IndexController } from "../controllers/index";

export function setRoutes(app: Express) {
  const indexController = new IndexController();

  app.get("/", indexController.home);
  app.post("/api/import", indexController.importRepositories);
  app.get("/api/repositories", indexController.getImportedRepositories);
}
