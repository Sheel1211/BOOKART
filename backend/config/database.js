import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(`mongodb+srv://pratham266:bookart@bookart.rexl0we.mongodb.net/`);
    console.log(`Connected to the database BookArt`);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}