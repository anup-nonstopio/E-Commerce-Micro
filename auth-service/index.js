import express from "express";
import router from "./routes/user.route.js"
import dbConnect from "./utils/dbConnect.js";

dbConnect();
const app = express();
const PORT = process.env.PORT_AUTH || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", router);

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});