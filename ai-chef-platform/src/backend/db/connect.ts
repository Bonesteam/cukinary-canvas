import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aichef";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "aichef",
    });
  }
  return connectionPromise;
}
