import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authroutes.js"
import userRouter from "./routes/userroutes.js"

import uploadOnCloudinary from "./utils/cloudinary.js";



const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


connectDB();
uploadOnCloudinary();


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started", port));