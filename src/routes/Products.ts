import express from "express";
import { createProduct, getProductsByQuery } from "../controllers/productController";

// crete new router : 


const ProductRouter = express.Router();

// add endpoint to products:


ProductRouter.post('/create',createProduct);
ProductRouter.get('/',getProductsByQuery);

// export : 
export default ProductRouter;