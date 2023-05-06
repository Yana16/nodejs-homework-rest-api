require("dotenv").config();
const Jimp = require("jimp");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// const fs = require('fs/promises')
const path = require("path");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { ErrorCreator, ctrlWrapper } = require("../utils");
const { User } = require("../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw ErrorCreator(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const { email: userEmail, subscription } = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: userEmail,
      subscription,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ErrorCreator(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw ErrorCreator(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};
const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Logout successful" });
};
const updateSub = async (req, res) => {
  const { id, subscription } = req.user;
  const { subscription: newSub } = req.body;
  if (subscription === newSub) {
    throw ErrorCreator(409, "The user already has that subscription!");
  }
  await User.findByIdAndUpdate(id, { subscription: newSub });
  res.json(req.body);
};
const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${id}_${filename}`;
  const resultPath = path.join(avatarsDir, avatarName);

  Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(250, 250).write(resultPath);
    })
    .catch((err) => {
      console.error(err);
    });

  // await fs.rename(tempUpload, resultPath)
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL });
};
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateSub: ctrlWrapper(updateSub),
};
