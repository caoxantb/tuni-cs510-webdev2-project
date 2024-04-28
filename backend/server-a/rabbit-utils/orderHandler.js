import Order from "../models/order.js";
import { sendToWebSocket } from "../utils/socketIO.js";

export const orderHandler = async (order, action, event = "orderStatus") => {
  switch (action) {
    case "created":
      sendToWebSocket(
        event,
        await Order.findByIdAndUpdate(
          order._id,
          { status: "received" },
          { new: true },
        ),
      );
      break;
    case "acked":
      sendToWebSocket(
        event,
        await Order.findByIdAndUpdate(
          order._id,
          { status: "inQueue" },
          { new: true },
        ),
      );
      break;
    case "nacked":
      sendToWebSocket(
        event,
        await Order.findByIdAndUpdate(
          order._id,
          { status: "failed" },
          { new: true },
        ),
      );
      break;
    case "done":
      const orderParsed = JSON.parse(order);
      sendToWebSocket(
        event,
        await Order.findByIdAndUpdate(
          orderParsed._id,
          { status: "ready" },
          { new: true },
        ),
      );
      break;
    default:
      console.error("Action not found");
  }
};
