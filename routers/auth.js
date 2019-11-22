const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

const adminCredentials = {
  username: "admin",
  password: "admin123"
};

authRouter
  .route("/")
  .get((req, res) => {
    res.send("You are in login page");
    
    // res.render("login")
  })
  .post((req, res) => {
    // console.log(req.body)
    if (!req.body.username && !req.body.password) {
      res.status(400).json({
        error: "missing required properties"
      });
      return;
    }
    if (
      adminCredentials.username === req.body.username &&
      adminCredentials.password === req.body.password
    ) {
      const token = jwt.sign(
        {
          sub: "user",
          username: req.body.username
        },
        process.env.JWT_KEY,
        {
          expiresIn: "3 hours"
        }
      );
      // res.status(200).json({
      //   authToken: token
      // });
      res.render("home")
    } else {
      res.status(401).json({
        error: "User Not Found"
      });
    }
  });

module.exports = authRouter;
