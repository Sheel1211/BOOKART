import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const app = express();

import cookieParser from "cookie-parser";
import { router } from "../routes/route.js";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello I am Server");
});

app.use("/", router);