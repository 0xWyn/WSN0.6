import { authenticateSocket } from "./socketAuth.js";
import { registerSocketHandlers } from "./socketHandlers.js";

export const configureSocket = (io) => {
    io.use(authenticateSocket);

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        registerSocketHandlers(io, socket);
    });
};
