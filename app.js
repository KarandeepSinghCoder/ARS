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
var hospital = require("./modles/hospital"),
  heart = require("./modles/heart"),
  intestine = require("./modles/intestine"),
  kidney = require("./modles/kidney"),
  liver = require("./modles/liver"),
  lungs = require("./modles/lungs"),
  pancreas = require("./modles/pancreas"),
  plasma = require("./modles/plasma");

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

// ***************************Authentication section bigins***************************
//passport
app.use(
  require("express-session")({
    secret: "HIII ARKS",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(hospital.authenticate()));
passport.serializeUser(hospital.serializeUser());
passport.deserializeUser(hospital.deserializeUser());
//REGISTER

app.get("/register", function(req, res) {
  res.render("register");
});
app.post("/register", function(req, res) {
  req.body.username;
  req.body.password;
  hospital.register(
    new hospital({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contact: req.body.contact
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.redirect("/hospitallogin");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/hospitallogin");
      });
    }
  );
});

app.post(
  "/hospitallogin",
  passport.authenticate("local", {
    successRedirect: "/hospitaldashboard",
    failureRedirect: "/hospitallogin"
  }),
  function(req, res) {}
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// ***************************Authentication section ends***************************
//RESTFUL ROUTES
app.get("/", function(req, res) {
  res.render("index");
});
app.get("/hospitallogin", function(req, res) {
  res.render("hospitallogin");
});

app.get("/register", function(req, res) {
  res.render("register.ejs");
});

app.get("/hospitaldashboard", function(req, res) {
  res.render("hospitaldashboard");
});
app.get("/findorgan", function(req, res) {
  //form to be submited so as to search database
  res.render("findorgan");
});
app.get("/organ", function(req, res) {
  //to display all the organs
  res.render("organ");
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
