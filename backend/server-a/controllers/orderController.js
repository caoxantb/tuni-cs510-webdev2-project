import { Order } from "../models";
import { Unauthorized, Forbidden } from "../utils/httpError";

export const getAllOrders = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to access this data.");
  }
  if (req.user.role !== "admin") {
    throw new Forbidden("You do not have a permission to access this data.");
  }
  const orders = await Order.find({});
  res.json(orders);
};

export const getCurrentUserOrders = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to access this data.");
  }
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const user = req.user;
  const { orderId } = req.params;

  if (!user) {
    throw new Unauthorized("You must be logged in to access this data.");
  }

  const order = await Order.findById(orderId);

  if (user.role !== "admin" && user._id !== order?.userId) {
    throw new Forbidden("You do not have a permission to access this data.");
  }

  res.json(order);
};

export const createOrder = async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new Unauthorized("You must be logged in to create an order.");
  }

  const order = new Order({
    ...req.body,
    userId: user._id,
  });

  const newOrder = await Order.create(order);

  res.status(201).json(newOrder);
};
