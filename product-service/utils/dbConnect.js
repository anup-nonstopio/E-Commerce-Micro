import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/product-service");
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error connecting to database", error);
    }
};

export default dbConnect;