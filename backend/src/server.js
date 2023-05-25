import express from "express"
import {app} from "./app.js";
import dotenv from "dotenv";


dotenv.config({
    path:"./config/config.env"
})

// connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(` Server is running at ${process.env.PORT} `);
})