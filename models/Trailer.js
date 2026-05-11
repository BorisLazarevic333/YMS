const mongoose = require("mongoose");

const trailerSchema = new mongoose.Schema({
  driverName: String,
  truckNumber: String,
  trailerNumber: String,
  company: String,
  type: String,

  status: {
    type: String,
    default: "IN_YARD",
  },

  ingateTime: {
    type: Date,
    default: Date.now,
  },

  outgateTime: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Trailer", trailerSchema);
