import { getTask } from "./rabbit-utils/receiveTask.js";

getTask("rapid-runner-rabbit", "backline-order-queue");