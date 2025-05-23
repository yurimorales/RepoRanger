import express from 'express';
import { setRoutes } from './routes/index';
import { connectRabbitMQ } from './queue/rabbitmq';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectRabbitMQ();

// routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});