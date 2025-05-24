import { Request, Response } from "express";
import { Repository } from "../models/repository";
import { sendRepoImportJob } from "../queue/rabbitmq";
import { parse } from "csv-parse/sync";
export class IndexController {
  
  public async home(req: Request, res: Response) {
    const data = { message: "Welcome to the home page!" };
    res.json(data);
  }

  public async importRepositories(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      console.log("REQ.FILE:", req.file);

      const csv = req.file.buffer.toString("utf-8");
      const repositories = parse(csv, {
        columns: ["name", "url"],
        skip_empty_lines: true,
      }).map((repo: any) => ({
        ...repo,
        owner: repo.url.split("/")[3], // extrai o owner da URL do GitHub
      }));

      await sendRepoImportJob(repositories);
      res
        .status(202)
        .json({ message: "Importing repositories, processing in background." });
    } catch (error) {
      res.status(500).json({ message: "Failed to parse CSV" });
    }
  }

  public async getImportedRepositories(req: Request, res: Response) {
    try {
      const repositories = await Repository.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.json(repositories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching imported repositories" });
    }
  }
}
