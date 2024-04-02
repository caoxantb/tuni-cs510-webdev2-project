import http from "http";

import app from "./app";
import { connectDatabase, disconnectDatabase } from "./db/connection";

connectDatabase();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
