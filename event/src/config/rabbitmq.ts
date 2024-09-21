import amqp from 'amqplib';

const RABBITMQ_URL: string = process.env.RABBITMQ_URL || 'amqp://localhost:8086';

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

export async function connect() {
    if (!connection) {
        connection = await amqp.connect(RABBITMQ_URL);
    }
    if (!channel) {
        channel = await connection.createChannel();
    }
    return channel;
}
