const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://yana:123@cluster0.fmvxyx6.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message));
