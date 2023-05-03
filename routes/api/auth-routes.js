const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth-controllers");

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

userRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

userRouter.get("/current", authenticate, ctrl.current);

userRouter.post("/logout", authenticate, ctrl.logout);

module.exports = userRouter;
