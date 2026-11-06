import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import app from "./app.js";
import { configureSocket } from "./socket/socketConfig.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 60000,
});

configureSocket(io);

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
