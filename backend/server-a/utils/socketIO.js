import { Server } from "socket.io";

let io;

/**
 * Connects the server to a WebSocket.
 * @param {Object} server - The server object.
 * @returns {Object} - The WebSocket object.
 */
export const connectWebSocket = server => {
  io = new Server(server, {
    cors: {
      origin: "https://vinbanhmi.netlify.app",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", socket => {
    console.log("Connect to socket ID:", socket.id);
  });
  return io;
};

/**
 * Sends a message to the WebSocket.
 * @param {string} event - The event to emit.
 * @param {*} message - The message to send.
 * @returns {void}
 */
export const sendToWebSocket = (event, message) => {
  io.emit(event, message);
};
