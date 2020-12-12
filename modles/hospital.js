var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var HospitalSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  name: {
    type: String,
    required: [true, 'Please enter the name of the Hospital']
  },
  contactNumber: {
    type: Number,
    required: [true, 'Please enter a contact number']
  },
  email: {
    type: String,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email id']

  },
  address: {
    type: String,
    required: [true, 'Please enter an address']
  },
  location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
  Heart: {
    count: Number,
    donatedAt: Date,
    age: Number
  },
  Intestine: {
    count: Number,
    donatedAt: Date,
    age: Number
  },
  Kidney: {
    count: Number,
    donatedAt: Date,
    age: Number
  },
  Liver: {
    count: Number,
    donatedAt: Date,
    age: Number
  },
  Lungs: {
    count: Number,
    donatedAt: Date,
    age: Number
  },
  Pancreas: {
    count: Number,
    donatedAt: Date,
    age: Number
  },
  Plasma: {
    count: Number,
    age: Number,
    recoveredAt: Date
  }
});


    //Geocode & create a field
    HospitalSchema.pre('save', async function(next) {
      const loc = await geocoder.geocode(this.address);
      this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
      };

      // Do not save address in DB
      this.address = undefined;
      next();
    });

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Hospital", HospitalSchema);