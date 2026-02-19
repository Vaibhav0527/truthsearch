import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";



const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


connectDB();
connectCloudinary();

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started", port));