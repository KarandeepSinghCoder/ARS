var mongoose = require("mongoose");
var heart = new mongoose.Schema({
  hosp: String,
  date: String,
  age: String,
  remarks: String
  // points: int
});
module.exports = mongoose.model("heart", heart);
