import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  getUserByUsername,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/userController.js";

const userRouter = new express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").post(userLogout);
userRouter.route("/current").get(getCurrentUser)
userRouter
  .route("/:username")
  .get(getUserByUsername)
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;
