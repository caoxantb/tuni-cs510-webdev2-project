import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;

let io;

export const connectWS = server => {
  io = new Server(server, {
    cors: {
      origin: `http://localhost:${PORT}`,
    },
  });

  io.on("connection", socket => {
    console.log("Connect to socket ID:", socket.id);
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
