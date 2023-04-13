const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://yana:1602@cluster0.fmvxyx6.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
