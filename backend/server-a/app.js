import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import {
  orderRouter,
  sandwichRouter,
  userRouter,
  toppingRouter,
} from "./routers/index.js";

import { errorHandler } from "./middlewares/error.js";
import { authenticateUser } from "./middlewares/auth.js";

const app = express();

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // one week
  path: "/",
  sameSite: "strict",
  secure: false,
};
const cookieSecret = process.env.COOKIE_SECRET;

app.set("cookieOptions", cookieOptions);
app.set("cookieSecret", cookieSecret);

// middlewares
app.use(cookieParser(cookieSecret, cookieOptions));
app.use(authenticateUser);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// routes
app.use("api/v1/order", orderRouter);
app.use("api/v1/sandwich", sandwichRouter);
app.use("api/v1/user", userRouter);
app.use("api/v1/topping", toppingRouter);

// error
app.use(errorHandler);

export default app;
