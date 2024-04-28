import { Topping } from "../models/index.js";

/**
 * Get all toppings.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - An array of toppings.
 */
export const getAllToppings = async (req, res) => {
  const toppings = await Topping.find({});
  res.json(toppings);
};
