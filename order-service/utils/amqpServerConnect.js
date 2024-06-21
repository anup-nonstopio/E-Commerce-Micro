import amqp from "amqplib";

var channel, connection;

async function amqpServerConnect() {
    console.log("Connecting to AMQP Server");
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
}

export { amqpServerConnect, channel, connection };