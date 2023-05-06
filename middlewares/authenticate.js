const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { ErrorCreator } = require("../utils");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(ErrorCreator(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(ErrorCreator(401));
    }
    req.user = user;
    next();
  } catch {
    next(ErrorCreator(401));
  }
};
module.exports = authenticate;
