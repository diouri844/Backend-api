import { Request, Response } from "express";
import Product from "../models/product/productModel";


// create new product :


const createProduct = async (req:Request, res:Response) => {
    // extract data from body : 
    try{
        const {
            name ,
            image,
            description,
            price,
            seller,
            category,
            region,
            country,
            productType
        } =  req.body;
        // create new doc :
        const Registredproduct = await Product.create(
            req.body
        );
        // return response :
        res.status( 200 ).json({
            status:"success",
            message:"Product Registration Successfully",
            product:Registredproduct
        });
    }
    catch( err){
        console.error( err );
        // send bad request : 
        return res.status( 500 ).json({
            status:"unknown",
            message:err.message
            }
        );
    }
}