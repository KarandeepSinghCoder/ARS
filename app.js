//Requirements
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const { check, validationResult } = require("express-validator");

//Modles to be included
var hospital = require("./modles/hospital"),
  organ = require("./modles/organ"),
  plasma = require("./modles/plasma");
//Modles ends
app.use("/", express.static("public"));

//PORT ADDRESS
var port = process.env.PORT || 3001;

//Altus Data cluster connection query
// mongoose
//   .connect("//cluster link to be added here", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//   })
//   .then(() => console.log("DB Connected!"))
//   .catch(err => {
//     console.log("fail");
//     console.log(err);
//   });
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
  console.log("server is on");
});
