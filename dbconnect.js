import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const URI = process.env.URI;

const dbconnect = async() => {
    try {
        await mongoose.connect(URI)
        console.log("Db connected successfully")
    } catch (error) {
        console.error(error);
    }
}

export default dbconnect