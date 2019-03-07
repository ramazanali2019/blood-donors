const { Donor, Patient } = require('../models');

module.exports = app => {
  app.get('/', async(req, res) => {
    const { userId: user } = req.session;
    const totalDonor = Donor.countDocuments();
    const solvedPatient = Patient.countDocuments({ solved: true });
    const donatedDonor = Donor.countDocuments({ donatedOnce: true });
    Promise.all([totalDonor, solvedPatient, donatedDonor]).then((result) => {
      res.render('home', { result, user });
    }).catch(err => {
      console.log(err);
    });
  });
}
