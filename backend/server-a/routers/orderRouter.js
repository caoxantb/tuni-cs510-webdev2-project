import express from "express";
import {
  getAllOrders,
  getCurrentUserOrders,
  getOrderById,
  createOrder,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.route("/").get(getAllOrders).post(createOrder);
orderRouter.route("/:orderId").get(getOrderById);
orderRouter.route("/own").get(getCurrentUserOrders);

export default orderRouter;