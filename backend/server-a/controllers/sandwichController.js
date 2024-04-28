import { Sandwich } from "../models/index.js";
import { NotFound } from "../utils/httpError.js";

/**
 * Get all sandwiches.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - An array of sandwiches.
 */
export const getAllSandwiches = async (req, res) => {
  const sandwich = await Sandwich.find({});
  res.json(sandwich);
};

/**
 * Get a sandwich by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The sandwich object.
 * @throws {NotFound} - If the sandwich is not found.
 */
export const getSandwichById = async (req, res) => {
  const sandwich = await Sandwich.findById(req.params.sandwichId);
  if (!sandwich) throw new NotFound("Sandwich not found.");
  res.json(sandwich);
};

/**
 * Create a new sandwich.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The newly created sandwich object.
 * @throws {Unauthorized} - If the user is not logged in.
 * @throws {Forbidden} - If the user does not have permission to create a sandwich.
 */
export const createSandwich = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to create a new sandwich.");
  }
  if (req.user.role !== "admin") {
    throw new Forbidden(
      "You do not have a permission to create a new sandwich.",
    );
  }
  const sandwich = new Sandwich(req.body);
  const newSandwich = await Sandwich.create(sandwich);
  res.status(201).json(newSandwich);
};

/**
 * Update a sandwich by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated sandwich object.
 * @throws {Unauthorized} - If the user is not logged in.
 * @throws {Forbidden} - If the user does not have permission to update a sandwich.
 * @throws {NotFound} - If the sandwich is not found.
 */
export const updateSandwich = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("You must be logged in to update a new sandwich.");
  }
  if (req.user.role !== "admin") {
    throw new Forbidden(
      "You do not have a permission to update a new sandwich.",
    );
  }
  const sandwich = await Sandwich.findByIdAndUpdate(
    req.params.sandwichId,
    req.body,
  );
  if (!sandwich) throw new NotFound("Sandwich not found.");
  res.json(sandwich);
};

/**
 * Delete a sandwich by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Unauthorized} - If the user is not logged in.
 * @throws {Forbidden} - If the user does not have permission to delete a sandwich.
 * @throws {NotFound} - If the sandwich is not found.
 */
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
