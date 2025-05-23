import { Request, Response } from "express";
import { Repository } from "../models/repository";
import { sendRepoImportJob } from "../queue/rabbitmq";

export class IndexController {
  public async home(req: Request, res: Response) {
    const data = { message: "Welcome to the home page!" };
    res.json(data);
  }

  public async importRepositories(req: Request, res: Response) {
    const { repositories } = req.body;
    if (!repositories || !Array.isArray(repositories)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    sendRepoImportJob(repositories);
    res
      .status(202)
      .json({ message: "Importing repositories, processing in background." });
  }

  public async getImportedRepositories(req: Request, res: Response) {
    try {
      const repositories = await Repository.find();
      res.json(repositories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching imported repositories" });
    }
  }
}
