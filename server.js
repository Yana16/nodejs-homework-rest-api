const mongoose = require("mongoose");
const app = require("./app");
// require("dotenv").config();

const DB_HOST =
  "mongodb+srv://yana:1602@cluster0.fmvxyx6.mongodb.net/db-contacts?retryWrites=true&w=majority";

console.log(DB_HOST);
console.log(process.env);

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
