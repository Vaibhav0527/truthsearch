import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authroutes.js"
import userRouter from "./routes/userroutes.js"
import historyRouter from "./routes/historyroutes.js"





const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
  credentials: true,
}));
app.use(cookieParser());


connectDB();
// uploadOnCloudinary();


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/history",historyRouter)


app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started", port));