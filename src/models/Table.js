const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  isAvailable: Boolean
});

module.exports = mongoose.model("Table", tableSchema);