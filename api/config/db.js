import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
};

export default connectDB