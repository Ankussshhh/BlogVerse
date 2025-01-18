const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/BlogVerse")
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});
