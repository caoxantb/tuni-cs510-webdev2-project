import { Sandwich } from "../models/index.js";
import { NotFound } from "../utils/httpError.js";

export const getAllSandwiches = async (req, res) => {
  const sandwich = await Sandwich.find({});
  res.json(sandwich);
};

export const getSandwichById = async (req, res) => {
  const sandwich = await Sandwich.findById(req.params.sandwichId);
  if (!sandwich) throw new NotFound("Sandwich not found.");
  res.json(sandwich);
};

export const createSandwich = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to create a new sandwich.");
  }
  if (req.user.role !== "admin") {
    throw new Forbidden(
      "You do not have a permission to create a new sandwich."
    );
  }
  const sandwich = new Sandwich(req.body);
  const newSandwich = await Sandwich.create(sandwich);
  res.status(201).json(newSandwich);
};

export const updateSandwich = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to update a new sandwich.");
  }
  if (req.user.role !== "admin") {
    throw new Forbidden(
      "You do not have a permission to update a new sandwich."
    );
  }
  const sandwich = await Sandwich.findByIdAndUpdate(
    req.params.sandwichId,
    req.body
  );
  if (!sandwich) throw new NotFound("Sandwich not found.");
  res.json(sandwich);
};

export const deleteSandwich = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to delete a sandwich.");
  }
  if (req.user.role !== "admin") {
    throw new Forbidden("You do not have a permission to delete a sandwich.");
  }
  const sandwich = await Sandwich.findByIdAndDelete(req.params.sandwichId);
  if (!sandwich) throw new NotFound("Sandwich not found.");
};


