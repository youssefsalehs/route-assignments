const { Router } = require("express");
const userController = require("./user.controller.js");
const userRouter = Router();
const guard = require("../../common/auth/guard.js");
userRouter.get("/by-email", userController.getUserByEmail);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/{:id}", guard, userController.createOrUpdateUser);
module.exports = userRouter;
