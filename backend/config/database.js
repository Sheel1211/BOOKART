import mongoose from "mongoose";

// export async function connectDatabase() {
//   mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("Connected to database ")
//   }).catch((e) => {
//     console.log(e);
//   });
// }

export async function connectDB(url) {
  return mongoose.connect(url).then(() => {
    console.log("Connected to database...");
  })
}
