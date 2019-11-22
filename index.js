const express = require("express");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const engines = require('consolidate');
const path = require('path')

require("dotenv").config();

const app = express();
app.engine('hbs',engines.handlebars)
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','hbs')
app.use('/images',express.static(path.join(__dirname,'./public/images')))
app.use('/css',express.static(path.join(__dirname,'./public/css')))

const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");

const jwtCheck = expressJwt({
  secret: process.env.JWT_KEY
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("login")
});
app.get("/home",(req,res)=>{
  res.render("home")
})
app.use("/login", authRouter);
app.use("/users", jwtCheck, userRouter);

const server = app.listen(process.env.PORT, () => {
  console.log("Server running in port :", server.address().port);
});
