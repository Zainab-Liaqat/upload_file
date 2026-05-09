import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB =  async() =>{
    try{
const connectInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
    }
    catch(err){
        console.error("Error connecting to database: ", err);
        process.exit(1);
    }
}


