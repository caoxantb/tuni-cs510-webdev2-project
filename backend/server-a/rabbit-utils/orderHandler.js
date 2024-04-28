import Order from "../models/order.js";
import { sendtoWS } from "../ws.js";

const event = "orderStatus";

export const orderHandler = async (order, action) => {
  switch (action) {
    case "created":
      sendtoWS(
        event,
        await Order.findByIdAndUpdate(
          order._id,
          { status: "received" },
          { new: true },
        ),
      );
      break;
    case "acked":
      sendtoWS(
        event,
        await Order.findByIdAndUpdate(
          order._id,
          { status: "inQueue" },
          { new: true },
        ),
      );
      break;
    case "nacked":
      sendtoWS(
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
      sendtoWS(
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
