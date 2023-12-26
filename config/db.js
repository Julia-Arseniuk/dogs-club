import mongoose from "mongoose";
import { mongoUri } from "./keys.js";

const dbName = 'test_db'

const connectDB = async () => {
    try {
        await mongoose.connect(`${mongoUri}/${dbName}`);
        console.log('Mongo DB connected');
    } catch (err) {
        console.error('err: ', err.message);
        process.exit(1);
    }
}

export default connectDB;