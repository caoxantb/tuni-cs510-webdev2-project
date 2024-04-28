import { Server } from "socket.io";

const CLIENT_PORT = 5173;

let io;

export const connectWS = server => {
  io = new Server(server, {
    cors: {
      origin: `http://localhost:${CLIENT_PORT}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", socket => {
    console.log("Connect to socket ID:", socket.id);
  });
  return io;
};

export const sendToWebSocket = (event, message) => {
  io.emit(event, message);
};
