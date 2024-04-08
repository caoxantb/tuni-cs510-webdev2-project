import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { Forbidden } from "../utils/httpError.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies?.token;
  if (!token) {
    return next();
  }

  const cookieOptions = { ...res.app.get("cookieOptions"), signed: true };
  const decodedToken = jwt.verify(token);
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
  res.cookie("token", user.getToken(), cookieOptions);
  next();
};
