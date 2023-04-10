import express from "express";
import { createProduct, 
        getProductsByQuery,
        updateProductsById,
        deleteProductById
     } from "../controllers/productController";

import  auth  from "../middleware/isLogged";

// crete new router : 


const ProductRouter = express.Router();

// add endpoint to products:


ProductRouter.post('/create',auth, createProduct);
ProductRouter.get('/',getProductsByQuery);
ProductRouter.put('/:id',auth, updateProductsById);
ProductRouter.delete('/:id',auth, deleteProductById);

// export : 
export default ProductRouter;