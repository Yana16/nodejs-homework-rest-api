const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseErr } = require("../utils");

// eslint-disable-next-line no-useless-escape
const emailRegxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const subscription = ["starter", "pro", "business"];

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
  }),
  email: Joi.string().required().min(6).pattern(emailRegxp).messages({
    "any.required": `"email" is required`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" is required`,
  }),
  subscription: Joi.string().default(subscription[0]),
});
const loginSchema = Joi.object({
  email: Joi.string().required().min(6).pattern(emailRegxp).messages({
    "any.required": `"email" is required`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" is required`,
  }),
});
const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscription),
});
const emailSchema = Joi.object({
  email: Joi.string().required().min(6).pattern(emailRegxp).messages({
    "any.required": `"email" is required`,
  }),
});
const userSchema = Schema(
  {
    name: { type: String, required: [true, "Type in a name"] },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegxp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseErr);

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  subscriptionSchema,
};
const User = model("user", userSchema);
module.exports = { User, schemas };
