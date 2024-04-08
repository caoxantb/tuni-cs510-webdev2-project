import { Topping } from "../models/index.js";

export const getAllToppings = async (req, res) => {
  const toppings = await Topping.find({});
  res.json(toppings);
};
