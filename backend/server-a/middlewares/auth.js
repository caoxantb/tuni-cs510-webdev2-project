import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { Forbidden } from "../utils/httpError.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Middleware function to authenticate a user using a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the authentication is complete.
 * @throws {Forbidden} - If the token is invalid or the user is unknown.
 */
export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies?.token;
  if (!token) {
    return next();
  }

  const cookieOptions = { ...res.app.get("cookieOptions"), signed: true };
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    res.clearCookie("token", cookieOptions);
    throw new Forbidden("Invalid token");
  }

  const user = await User.findOne({ username: decodedToken.username });
  if (!user) {
    res.clearCookie("token", cookieOptions);
    throw new Forbidden("Unknown user");
  }

  req.user = user;
  const { username, email } = user.toJSON();
  res.cookie(
    "token",
    jwt.sign({ username, email }, process.env.JWT_SECRET),
    cookieOptions,
  );
  next();
};
