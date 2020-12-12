var mongoose = require("mongoose");
var intestine = new mongoose.Schema({
  hosp: String,
  date: String,
  age: String,
  remarks: String
});
module.exports = mongoose.model("intestine", intestine);
