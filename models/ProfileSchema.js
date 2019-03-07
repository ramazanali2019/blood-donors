const mongoose = require('mongoose'),
      LocationSchema = require('./LocationSchema');

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  location: LocationSchema,
  bloodGroup: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

module.exports = ProfileSchema;
