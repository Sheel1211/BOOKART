import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/database.js";


const start = async () => {
  try {
    await connectDB(process.env.DB_URI)
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
      // console.log(process.env.DB_URI);
    });
  }
  catch (error) {
    console.log(error)
  }
}

start();
