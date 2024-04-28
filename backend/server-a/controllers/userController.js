import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/index.js";
import { BadRequest, Forbidden, NotFound } from "../utils/httpError.js";

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The newly created user.
 */
export const userRegister = async (req, res) => {
  const saltRounds = 10;
  const { username, email, role, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    throw new BadRequest("User already exists");
  }
  if (!password || password.length <= 8) {
    throw new BadRequest("Password must be at least 8 characters");
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    email,
    role,
    passwordHash,
  });

  await newUser.save();

  const accessToken = jwt.sign({ username, email }, process.env.JWT_SECRET);
  res.cookie("token", accessToken, {
    ...res.app.get("cookieOptions"),
    signed: true,
  });

  res.status(201).json(newUser);
};

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The user object.
 */
export const userLogin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const validCredentials = !user
    ? false
    : await bcrypt.compare(req.body.password, user.passwordHash);
  if (!(user && validCredentials)) {
    throw new BadRequest("Invalid credentials");
  }

  const { username, email } = user;

  const accessToken = jwt.sign({ username, email }, process.env.JWT_SECRET);
  res.cookie("token", accessToken, {
    ...res.app.get("cookieOptions"),
    signed: true,
  });

  res.json(user);
};

/**
 * Logs out the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The result of the logout operation.
 */
export const userLogout = async (req, res) => {
  if (req.user) {
    res.clearCookie("token", { ...res.app.get("cookieOptions"), signed: true });
  }
  res.status(201).json({ message: "User logged out!" });
};

/**
 * Get the current user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The current user object or null if not authenticated.
 */
export const getCurrentUser = (req, res) => {
  if (!req.user) return res.json(null);
  res.json(req.user);
};

/**
 * Get user by username.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the user object or throws a NotFound error if the user is not found.
 * @throws {NotFound} - If the user is not found.
 */
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    throw new NotFound("User not found");
  }
  res.json(user);
};

/**
 * Updates a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated user.
 * @throws {Forbidden} If the user does not have permission to update this user.
 * @throws {NotFound} If the user is not found.
 */
export const updateUser = async (req, res) => {
  const { username } = req.params;
  if (req.user?.username !== username) {
    throw new Forbidden("You do not have permission to update this user");
  }
  const user = await User.findOneAndUpdate({ username }, req.body);
  if (!user) {
    throw new NotFound("User not found");
  }
  res.json(user);
};

/**
 * Deletes a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 * @throws {Forbidden} - If the user does not have permission to delete the user.
 * @throws {NotFound} - If the user to be deleted is not found.
 */
export const deleteUser = async (req, res) => {
  const { username } = req.params;
  if (req.user?.role !== "admin" || req.user?.username === username) {
    throw new Forbidden("You do not have permission to delete this user");
  }
  const user = await User.findOneAndDelete({ username });
  if (!user) {
    throw new NotFound("User not found");
  }
  res.status(204).json();
};
