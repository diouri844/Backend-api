import mongoose from "mongoose";
//import User from "../user/userModel"

export interface IProduct extends mongoose.Document {
    name:String;
    image:String;
    description:String;
    price: Number;
    seller: mongoose.Types.ObjectId;
    category:String;
    region:String;
    country:String;
    productType:String;
}