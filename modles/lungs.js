var mongoose = require("mongoose");
var lungs = new mongoose.Schema({
  hosp: String,
  date: String,
  age: String,
  remarks: String
  // points: int
});
module.exports = mongoose.model("lungs", lungs);
