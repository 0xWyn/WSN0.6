import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateSocket = (socket, next) => {
    try {
        const cookies = parseCookie(socket.handshake.headers.cookie || "");
        const token = cookies.accessToken;

        if (!token) return next(new Error("Authentication required"));

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        socket.userId = decoded.id;

        next();
    } catch (error) {
        next(new Error("Invalid authentication"));
    }
};
