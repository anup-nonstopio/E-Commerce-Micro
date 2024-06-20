import amqp from "amqplib";

var channel, connection;

async function amqpServerConnect() {
    const amqpServer = "amqp://localhost:5000";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
}

export { amqpServerConnect, channel, connection };