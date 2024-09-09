import "dotenv/config";
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import db from "./data/connetion.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";


const app = express();
<<<<<<< HEAD
app.use(cors({ credentials: true, origin: "https://chipper-malasada-dbb91e.netlify.app/" }));
=======
app.use(cors({ credentials: true, origin: "https://peaceful-licorice-e9f0cc.netlify.app" }));
>>>>>>> 75496518dcce8152f2f05c28909ea2144b1930b0
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
