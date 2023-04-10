import express from "express";
import { createProduct, 
        getProductsByQuery,
        updateProductsById,
        deleteProductById
     } from "../controllers/productController";

// crete new router : 


const ProductRouter = express.Router();

// add endpoint to products:


ProductRouter.post('/create',createProduct);
ProductRouter.get('/',getProductsByQuery);
ProductRouter.put('/:id',updateProductsById);
ProductRouter.delete('/:id',deleteProductById);

// export : 
export default ProductRouter;