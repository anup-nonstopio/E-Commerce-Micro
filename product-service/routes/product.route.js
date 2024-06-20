import express from "express";
import { createProduct, buyProduct } from "../controllers/product.controller.js";
const router = express.Router();
import isAuthenticated from "../../middlewares/auth.middleware.js";

router.post("/create", isAuthenticated, createProduct);
router.post("/buy", isAuthenticated, buyProduct);

export default router;