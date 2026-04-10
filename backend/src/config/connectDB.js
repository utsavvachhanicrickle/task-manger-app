import mongoose from "mongoose";
let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
