import express from "express";
import {  deleteProduct, getProducts, saveProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/" , saveProducts);
productRouter.delete("/:productId" , deleteProduct)
productRouter.put("/:productId " , updateProduct)


export default productRouter;