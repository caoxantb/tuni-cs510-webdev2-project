import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import {
  orderRouter,
  sandwichRouter,
  userRouter,
  toppingRouter,
} from "./routers";

import { errorHandler } from "./middlewares/error";
import { authenticateUser } from "./middlewares/auth";

const app = express();

app.set("cookieOptions", {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // one week
  path: "/",
  sameSite: "strict",
  secure: false,
});
app.set("cookieSecret", process.env.COOKIE_SECRET);

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
