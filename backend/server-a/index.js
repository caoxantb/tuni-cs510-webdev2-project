import http from "http";

import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./db/connection.js";
import { getTask } from "./rabbit-utils/receiveTask.js";
import { connectWebSocket } from "./utils/socketIO.js";

connectDatabase();
getTask("rapid-runner-rabbit", "frontline-order-queue");

const server = http.createServer(app);
const io = connectWebSocket(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
