import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(``)
    .then((c) => {
        console.log("Connected to database");
    })
    .catch((e) => {
        console.log(e);
    });
};
