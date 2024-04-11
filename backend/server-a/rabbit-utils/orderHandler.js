import Order from "../models/order.js";

export const orderHandler = async (order, action) => {
  switch (action) {
    case "created":
      await Order.findByIdAndUpdate(order._id, { status: "received" });
      break;
    case "acked":
      await Order.findByIdAndUpdate(order._id, { status: "inQueue" });
      break;
    case "nacked":
      await Order.findByIdAndUpdate(order._id, { status: "failed" });
      break;
    case "done":
      await Order.findByIdAndUpdate(order._id, { status: "ready" });
      break;
    default:
      console.error("Action not found");
  }
};
