import { io } from "socket.io-client";

const URL = "https://server-a.fly.dev";

export const socket = io(URL);
