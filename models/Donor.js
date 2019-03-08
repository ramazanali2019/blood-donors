const mongoose = require('mongoose'),
      ProfileSchema = require('./ProfileSchema');

const DonorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  profile: ProfileSchema,
  donatedOnce: {
    type: Boolean,
    default: false
  },
  donated: {
    type: Number,
    default: 0
  },
  lastDonated: Number,
  smoke: {
    type: Boolean,
    required: true
  }
});

const Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
