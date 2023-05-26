import express, { request } from "express"
import {app} from "./app.js";
import dotenv from "dotenv";

import { connectDatabase } from "../config/database.js";
dotenv.config({path:"../config.env"})

connectDatabase();

app.listen(5000,()=>{
    console.log(`Server is running at 5000 `);
})