import { Topping } from "../models";

export const getAllToppings = async (req, res) => {
  const toppings = await Topping.find({});
  res.json(toppings);
};
