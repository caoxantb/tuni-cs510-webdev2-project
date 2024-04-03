import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  getUserByUsername,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const userRouter = new express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").post(userLogout);
userRouter
  .route(":username")
  .get(getUserByUsername)
  .put(updateUser)
  .deleteUser(deleteUser);

export default userRouter;
