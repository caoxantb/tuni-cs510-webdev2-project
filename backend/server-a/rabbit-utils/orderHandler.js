import Order from "../models/order.js";
import { getIO } from "../ws.js";

const io = getIO();

export const orderHandler = async (order, action) => {
  switch (action) {
    case "created":
      await Order.findByIdAndUpdate(order._id, { status: "received" });
      io.emit("orderStatus", { ...order, status: "received" });
      break;
    case "acked":
      await Order.findByIdAndUpdate(order._id, { status: "inQueue" });
      break;
    case "nacked":
      await Order.findByIdAndUpdate(order._id, { status: "failed" });
      break;
    case "done":
      const orderParsed = JSON.parse(order);
      await Order.findByIdAndUpdate(orderParsed._id, { status: "ready" });
      break;
    default:
      console.error("Action not found");
  }
};
