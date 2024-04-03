import express from "express";
import { getAllToppings } from "../controllers/toppingController";

const toppingRouter = express.Router();

toppingRouter.route("/").get(getAllToppings);

export default toppingRouter;
