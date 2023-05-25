import express from "express"
import {app} from "./app.js";
import dotenv from "dotenv";

const app=express();

// dotenv.config({
//     path:"./config/config.env"
// })

connectDatabase();


app.listen(5000,()=>{
    console.log(` Server is running at 5000 `);
})