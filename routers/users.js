const express = require("express");
const userRouter = express.Router();

userRouter.route("/").get((req, res) => {
  res.send("Now you are in Users Page");
});

userRouter.route("/profile").get((req, res) => {
  res.send("Now you are in user profile page");
});

module.exports = userRouter;
