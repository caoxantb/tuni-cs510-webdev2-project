import { getTask } from "./rabbit-utils/receiveTask.js";
import dotenv from "dotenv";
dotenv.config();

getTask(process.env.RABBITMQ_HOST, "backline-order-queue");