import express from "express";
import { deleteProducts, getproductById, getProducts, saveProducts, updateProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/" , saveProducts);
productRouter.delete("/:productId",deleteProducts);
productRouter.put("/:productId",updateProducts)
productRouter.get("/:productId",getproductById)


export default productRouter;