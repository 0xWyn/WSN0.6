import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import accessRoutes from "./routes/accessRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { useIO } from "./useIO.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(cookieParser());
app.use("/api/auth", accessRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

const server = http.createServer(app);

export const { io } = useIO(server);

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("🚀 App connected to mongoDB");
        server.listen(port, () => {
            console.log(`🔌 App live at ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
