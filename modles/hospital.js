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
var hospital = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  contact: String,
  email: String,
  address: String
  // ,
  //   location: {
  //     // GeoJSON Point
  //     type: {
  //       type: String,
  //       enum: ["Point"]
  //     },
  //     coordinates: {
  //       type: [Number],
  //       index: "2dsphere"
  //     },
  //     formattedAddress: String,
  //     street: String,
  //     city: String,
  //     state: String,
  //     zipcode: String,
  //     country: String
  //   }
  // });

  // //Geocode & create a field
  // HospitalSchema.pre("save", async function(next) {
  //   const loc = await geocoder.geocode(this.address);
  //   this.location = {
  //     type: "Point",
  //     coordinates: [loc[0].longitude, loc[0].latitude],
  //     formattedAddress: loc[0].formattedAddress,
  //     street: loc[0].streetName,
  //     city: loc[0].city,
  //     state: loc[0].stateCode,
  //     zipcode: loc[0].zipcode,
  //     country: loc[0].countryCode
  //   };

  //   // Do not save address in DB
  //   this.address = undefined;
  //   next();
});

hospital.plugin(passportLocalMongoose);
module.exports = mongoose.model("hospital", hospital);
