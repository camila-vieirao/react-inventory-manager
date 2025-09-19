import express from "express";
import { getProducts, addProduct, deleteProduct, updateProduct, searchProduct } from "../Controllers/products.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.get("/search", searchProduct);

export default router;