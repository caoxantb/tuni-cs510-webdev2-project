import { getTask } from "./rabbit-utils/receiveTask.js";

getTask("localhost", "backline-order-queue");