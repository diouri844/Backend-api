import { Request, Response } from "express";
import Product from "../models/product/productModel";
import { IProduct } from "../models/product/product.interface";
import Options from '../utils/Paginate';
import { isValidOId } from '../utils/utility';
// create new product :


export const createProduct = async (req:Request, res:Response) => {
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


// get product is a function to get product by :

/*
category, 
price,
region,
country, 
product type
*/

export const getProductsByQuery = async (req:Request, res:Response) => {
    // get filtred products 
    try{
        const { category, price, region, country, productType, page = 1, limit = 10 } = req.query; 
        // get all products :
        const query: Record<string, any> = {};
        if (category) {
            query.category  = category;     
        }
        if ( price ){
            const priceRange = (price as string).split('-');
            query.price = { $gte: priceRange[0], $lte: priceRange[1] };
        }
        if ( region ){
            query.region = region;
        }
        if ( country ){
            //filter by country :
            query.country = country;
        }
        if ( productType ) {
            query.productType = productType; 
        } 
        res.status(200).json({
            status:"success",
            products:await Product.paginate(
                query,
                Options
            )
        });
    }
    catch( err ){
        res.status(500).json(
            {
                status:"unknown",
                message:err.message   
            }
        );
    }
        
}




export const updateProductsById = async ( req:Request, res:Response) =>{
    // get id from params : 
    const { id } = req.params;
    if ( ! isValidOId ( id )){
        res.status(404).json({
            status:"unknown",
            message:" Product  id not valid OID "
        });
    }
    // get updated product : 
    const updatedProduct:IProduct = req.body;
    // try to update target : 
    try{
        const target = await Product.findByIdAndUpdate(
            id,
            updatedProduct,
            { new: true }
        );
        // check product status :
        if ( !target ){
            res.status(404).json({
                status:"unknown",
                message:" Product not found"
            });    
        }
        // all is greate and target is updated : 
        res.status(200).json({
            status:"success",
            message:"Product Updated ",
            product:target
        });
    }catch( err ){
        res.status(500).json({
            status:"unknown",
            message:err.message 
        })
    }
}



export const deleteProductById = async ( req:Request, res:Response ) =>{
    const { id } = req.params;
    // check if is valid :
    if ( !isValidOId( id) ){
        res.status(404).json({
            status:"unknown",
            message:" Product  id not valid OID "
        });
    }
    // try to get
    try{
        const target:IProduct = await Product.findByIdAndDelete(id);
        if ( !target ){
            res.status(404).json({
                status:"unknown",
                message:" Product not found"
            }); 
        }
        // all is greate and product deleted :
        res.status(200).json(
            {
                status:"success",
                message:"Product Deleted ",
                product:target
            }
        ) 
    }catch( err ){
        res.status(500).json({
            status:"unknown",
            message:err.message 
        })
    }

}


