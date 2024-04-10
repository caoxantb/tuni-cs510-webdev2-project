import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase, disconnectDatabase } from "./connection.js";
import { Sandwich, Topping, User, Order } from "../models/index.js";

const readJsonFile = async (path) => {
  return JSON.parse(await readFile(new URL(path, import.meta.url)));
};

(async () => {
  connectDatabase();

  try {
    const sandwiches = await readJsonFile("./json/sandwiches.json");
    const toppings = await readJsonFile("./json/toppings.json");

    await Sandwich.deleteMany();
    await Topping.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    await Sandwich.create(sandwiches);
    await Topping.create(toppings);
  } catch (err) {
    console.error(err);
  } finally {
    disconnectDatabase();
  }
})();
