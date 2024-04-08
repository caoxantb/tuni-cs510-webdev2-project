import Order from "../models/order.js";

export const orderHandler = async (order, action) => {
  switch (action.type) {
    case "created":
      await Order.findByIdAndUpdate(order._id, { status: "received" });
    case "acked":
      await Order.findByIdAndUpdate(order._id, { status: "inQueue" });
    case "nacked":
      await Order.findByIdAndUpdate(order._id, { status: "failed" });
    case "done":
      await Order.findByIdAndUpdate(order._id, { status: "ready" });
    default:
      console.error("Action not found");
  }
};
