import express from "express";
import {
  getAllSandwiches,
  getSandwichById,
  createSandwich,
  updateSandwich,
  deleteSandwich,
} from "../controllers/sandwichController";

const sandwichRouter = express.Router();

sandwichRouter.route("/").get(getAllSandwiches).post(createSandwich);
sandwichRouter
  .route("/:sandwichId")
  .get(getSandwichById)
  .put(updateSandwich)
  .delete(deleteSandwich);

export default sandwichRouter;