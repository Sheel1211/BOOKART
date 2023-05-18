import express from "express";
import cors from "cors";

export const app = express();
app.use(cors(
    {
        origin:'*'
    }
));

app.get("/",(req,res)=>{
    res.send("Hello I am Server");
})
