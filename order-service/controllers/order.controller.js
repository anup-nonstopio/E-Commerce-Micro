import Order from '../models/order.model.js';
import { channel } from '../utils/amqpServerConnect.js';

function createOrder(products, userEmail) {
    let total = 0;
    for (let t = 0; t < products.length; t++) {
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total,
    });
    newOrder.save();
    return newOrder;
}

const consumeOrder = () => {
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
};

export { consumeOrder };