import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { BadRequest, NotFound } from "../utils/httpError.js";

export const userRegister = async (req, res) => {
  const saltRounds = 10;
  const { username, email, role, password } = req.body;

  const user = await User.findOne(username);

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

export const userLogin = async (req, res) => {
  const user = await User.findOne(req.body.username);
  const validCredentials = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);
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

export const userLogout = async (req, res) => {
  if (req.user) {
    res.clearCookie("token", { ...res.app.get("cookieOptions"), signed: true });
  }
  res.status(201).json({ message: "User logged out!" });
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne(username);
  if (!user) {
    throw new NotFound("User not found");
  }
  res.json(user);
};

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

