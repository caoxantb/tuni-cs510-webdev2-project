import express from "express";
import {
  getAllOrders,
  getCurrentUserOrders,
  getOrderById,
  createOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").get(getAllOrders).post(createOrder);
orderRouter.route("/own").get(getCurrentUserOrders);
orderRouter.route("/:orderId").get(getOrderById);

export default orderRouter;