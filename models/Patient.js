const mongoose = require('mongoose'),
      ProfileSchema = require('./ProfileSchema');

const PatientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  profile: ProfileSchema,
  problem: String,
  units: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: 'Scheduled'
  },
  requiredDate: {
    type: Date,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  request: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor'
  }],
  solved: {
    type: Boolean,
    default: false
  }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
