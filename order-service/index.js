import express from 'express';
import { consumeOrder } from "./controllers/order.controller.js";
import { amqpServerConnect } from "./utils/amqpServerConnect.js";
import dbConnect from "./utils/dbConnect.js";

const app = express();
const PORT = process.env.PORT_ONE || 9090;

dbConnect();
app.use(express.json());

amqpServerConnect().then(() => {
    channel.consume("ORDER", (data) => {
        console.log("Consuming ORDER service");
        const { products, userEmail } = JSON.parse(data.content);
        const newOrder = createOrder(products, userEmail);

        channel.ack(data);
        channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))
        );
    });
});

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});