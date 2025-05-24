import amqp, { ConsumeMessage } from "amqplib";
import { config } from "dotenv";

config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672"; // "amqp://rabbitmq"; 
const QUEUE_NAME = "repo_import_queue";

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async (retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log("Connected to RabbitMQ");
      return;
    } catch (error) {
      console.error(`Error connecting to RabbitMQ (attempt ${i + 1}):`, error);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Could not connect to RabbitMQ after multiple attempts.");
};

export const sendRepoImportJob = async (data: any) => {
  if (!channel) {
    console.error("Channel not initialized. Cannot send message.");
    return;
  }
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
  console.log("Repo import job sent:", data);
};

export const consumeRepoImportJobs = async (
  processJob: (data: any) => Promise<void>
) => {
  if (!channel) {
    console.error("Channel not initialized. Cannot consume messages.");
    return;
  }
  channel.consume(QUEUE_NAME, async (msg: ConsumeMessage | null) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      await processJob(data);
      channel!.ack(msg);
    }
  });
};
