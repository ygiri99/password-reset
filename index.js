import "dotenv/config";
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import db from "./data/connetion.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";


const app = express();
app.use(cors({ credentials: true, origin: "https://chipper-malasada-dbb91e.netlify.app/" }));
app.use(express.json());
app.use(cookieParser());

db();

app.use(authRouter);
app.use(userRouter);

app.get("/server", (req, res) => {
    res.send("Authentication server is running");
})


const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
    console.log(`Authentication server is running at ${PORT}`);
})