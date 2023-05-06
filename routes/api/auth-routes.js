const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../utils");
const { authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/auth-controllers");

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

userRouter.get("/verify/:verificationToken", ctrl.verify);

userRouter.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerify
);

userRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

userRouter.get("/current", authenticate, ctrl.current);

userRouter.post("/logout", authenticate, ctrl.logout);

userRouter.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSub
);

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = userRouter;
