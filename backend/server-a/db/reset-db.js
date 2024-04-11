//NOTE: This file is only for development purposes and should not be ran under any production circumstances.

import { readFile } from "fs/promises";
import bcrypt from "bcryptjs";
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
    const users = await readJsonFile("./json/users.json");

    const sandwichesUpdated = sandwiches.map((sandwiches) => ({
      ...sandwiches,
      breadType: ["oat", "rye", "wheat"][Math.floor(Math.random() * 3)],
    }));

    const usersAuthenticated = await Promise.all(
      users.map(async (user) => {
        const { password, ...userRest } = user;
        const passwordHash = await bcrypt.hash(password, 10);
        return { ...userRest, passwordHash };
      })
    );

    await Sandwich.deleteMany();
    await Topping.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    await Sandwich.create(sandwichesUpdated);
    await Topping.create(toppings);
    await User.create(usersAuthenticated);
  } catch (err) {
    console.error(err);
  } finally {
    disconnectDatabase();
  }
})();
