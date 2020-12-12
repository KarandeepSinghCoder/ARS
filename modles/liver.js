var mongoose = require("mongoose");
var liver = new mongoose.Schema({
  hosp: String,
  date: String,
  age: String,
  remarks: String
  // points: int
});
module.exports = mongoose.model("liver", liver);
