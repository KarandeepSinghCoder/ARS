var mongoose = require("mongoose");
var pancreas = new mongoose.Schema({
  hosp: String,
  date: String,
  age: String,
  remarks: String
  // points: int
});
module.exports = mongoose.model("pancreas", pancreas);
