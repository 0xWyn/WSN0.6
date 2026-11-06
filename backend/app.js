import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import clanRoutes from "./routes/clanRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/search", searchRouter);
app.use("/api/clans", clanRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
