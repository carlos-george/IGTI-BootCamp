import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db };
