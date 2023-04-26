const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message));
