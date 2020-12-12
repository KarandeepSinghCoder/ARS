//Requirements
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const { check, validationResult } = require("express-validator");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

//Modles to be included

//Modles ends
app.use("/", express.static("public"));

//PORT ADDRESS
var port = process.env.PORT || 3001;

dotenv.config();

connectDB();
//Altus Data cluster connection query ends

//app.use
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//RESTFUL ROUTES
app.get("/", function(req, res) {
  res.render("index");
});

//Hospital login
// app.get("/login", function(req, res) {
//   res.render("login.ejs");
// });
// app.get("/dashboard", function(req, res) {
//   //if data not available email form is rendered else Dashboard of the hospital is shown
//   res.render("hospitalDashboard");
// });

//Server
app.listen(port, function() {
  console.log("server is on".yellow.bold);
});
