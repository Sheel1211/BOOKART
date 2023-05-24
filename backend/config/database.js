import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(process.env.URI)
    .then((c) => {
        console.log("Connected to database");
    })
    .catch((e) => {
        console.log(e);
    });
};
