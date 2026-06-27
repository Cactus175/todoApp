import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pool from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js"
import tasksRoutes from "./src/routes/tasksRoutes.js"
import errorHandler from "./src/middleware/errorHandler.js";
import authRoutes from "./src/routes/authRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.use("/api", userRoutes, tasksRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})