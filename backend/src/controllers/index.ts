import { Request, Response } from 'express';
export class IndexController {
    public async getExample(req: Request, res: Response) {
        res.json({ message: "This is an example response from the IndexController." });
    }

    public async postExample(req: Request, res: Response) {
        const data = req.body;
        res.status(201).json({ message: "Data received", data });
    }

     public async home(req: Request, res: Response) {
        res.send("Welcome to the home page!");
    }

    public async getData(req: Request, res: Response) {
        const data = { message: "This is some sample data." };
        res.json(data);
    }

    // Add more methods as needed for handling different API endpoints

}
