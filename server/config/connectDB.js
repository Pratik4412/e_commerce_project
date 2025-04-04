import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("Please provide MONGODB_URL in the .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("mongodb connect error", error.message);
    process.exit(1);
  }
}

export default connectDB;
