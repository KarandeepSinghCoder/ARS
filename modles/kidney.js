var mongoose = require("mongoose");
var kidney = new mongoose.Schema({
  hosp: String,
  date: String,
  age: String,
  remarks: String
});
module.exports = mongoose.model("kidney", kidney);
