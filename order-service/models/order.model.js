import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: [
        {
            product_id: String,
        },
    ],
    user: String,
    total_price: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

const Order = mongoose.model("order", OrderSchema);

export default Order;