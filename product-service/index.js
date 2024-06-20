import express from "express";
import dbConnect from "./utils/dbConnect.js";
import router from "./routes/product.route.js";
import { amqpServerConnect } from "./utils/amqpServerConnect.js";


dbConnect();
amqpServerConnect();
const app = express();
const PORT = process.env.PORT_ONE || 8010;

var order;

app.use(express.json());
app.use("/product", router);

app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});