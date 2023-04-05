import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      image: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      price:{
        type: Number,
        required: true,
        min: 0
      },
      seller:{
        type: mongoose.Types.ObjectId,
        ref: 'seller'
      },
      category:{
        type:String,
        required:true
      },
    region:{ 
        type:String , 
        required: true
    },
    country:{ 
        type:String, 
        required:true
    },
    productType:{
        type:String,
        required:true
    }
});


// create model : 


const ProductModel = mongoose.model<IProduct>('product',ProductSchema);


export default ProductModel;