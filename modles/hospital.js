// var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");
// var UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   name: String,
//   WPnum: String
// });

// UserSchema.plugin(passportLocalMongoose);
// module.exports = mongoose.model("User", UserSchema);

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const geocoder = require("../utils/geocoder");
var hospital = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter a UserName".red.underline]
  },
  password: {
    type: String
  },
  name: {
    type: String,
    required: [true, "Please Enter the name of the Hospital"]
  },
  contact: {
    type: String,
    required: [true, "Please enter a contact number"]
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email id"
    ]
  },
  address: {
    type: String,
    required: true
  },
  // ,
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  }
});

hospital.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };
  next();
});
hospital.plugin(passportLocalMongoose);
module.exports = mongoose.model("hospital", hospital);
