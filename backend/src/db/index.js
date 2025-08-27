import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try {

      const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      console.log(`MongoDB Connected ! DB HOST : ${connectionInstance.connection.host}`);

if (mongoose.connection.readyState === 1) {
        console.log("MongoDB connection state: connected");
      } else {
        console.log("MongoDB connection state: not connected");
      }
    }
    catch(error) {
        console.log("Error connecting to MongoDB" , error);
        process.exit(1);
    }
    
}

export default connectDB