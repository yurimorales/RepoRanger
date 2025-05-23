import { Channel, Connection } from 'amqplib';
import { Repository } from '../models/repository';
import { connectRabbitMQ } from '../queue/rabbitmq';

const QUEUE_NAME = 'repo_import_queue';

export const importRepoJob = async (repoData: any) => {
    const connection: Connection = await connectRabbitMQ();
    const channel: Channel = await connection.createChannel();

    try {
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(repoData)), {
            persistent: true,
        });
        console.log('Job sent to queue:', repoData);
    } catch (error) {
        console.error('Error sending job to queue:', error);
    } finally {
        await channel.close();
        await connection.close();
    }
};

export const processRepoImportJob = async (msg: any) => {
    const repoData = JSON.parse(msg.content.toString());
    const { name, owner, stargazers_count } = repoData;

    try {
        const repository = new Repository({
            name,
            owner,
            stargazers_count,
        });
        await repository.save();
        console.log('Repository saved:', repository);
    } catch (error) {
        console.error('Error saving repository:', error);
    }
};