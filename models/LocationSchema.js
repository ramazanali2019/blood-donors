const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  state: String,
  country: {
    type: String,
    required: true
  }
});

module.exports = LocationSchema;
