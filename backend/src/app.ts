import express from "express";
import { setRoutes } from "./routes/index";
import { sequelize } from "./database";
import { connectRabbitMQ, consumeRepoImportJobs } from "./queue/rabbitmq";
import { processRepoImportJob } from "./jobs/repoImportJob";
import "./models/repository";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

async function startServer() {
  try {
    await connectRabbitMQ();
    
    await sequelize.sync(); // Cria as tabelas se não existirem
    console.log("Database synchronized");

    consumeRepoImportJobs(processRepoImportJob);
    setRoutes(app);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
