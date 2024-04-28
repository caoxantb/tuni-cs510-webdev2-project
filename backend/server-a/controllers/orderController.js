import { Order } from "../models/index.js";
import { Unauthorized, Forbidden } from "../utils/httpError.js";
import { orderHandler } from "../rabbit-utils/orderHandler.js";
import { addTask } from "../rabbit-utils/sendTask.js";

/**
 * Get all orders.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - An array of orders.
 */
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

/**
 * Get current user's orders.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - An array of orders.
 */
export const getCurrentUserOrders = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to access this data.");
  }
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

/**
 * Get order by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The order object.
 */
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

/**
 * Create a new order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The newly created order object.
 */
export const createOrder = async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new Unauthorized("You must be logged in to create an order.");
  }

  const order = new Order({
    ...req.body,
    status: "ordered",
    orderTime: new Date(),
    userId: user._id,
  });

  const newOrder = await Order.create(order);

  await orderHandler(newOrder, "created");
  addTask("rapid-runner-rabbit", "backline-order-queue", newOrder);

  res.status(201).json(newOrder);
};
