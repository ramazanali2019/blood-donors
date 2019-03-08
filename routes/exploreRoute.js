const { Donor, Patient } = require('../models');

module.exports = app => {
  app.get('/explore', (req, res) => {
    res.redirect('/explore/patient');
  });

  app.get('/explore/patient', async(req, res) => {
    const { userId } = req.session;
    try {
      const foundPatient = await Patient.find({ solved: false }).exec();
      return res.render('explore/patient', { patient: foundPatient, user: userId });
    } catch(err) {
      return res.redirect('/');
    }
  });

  app.get('/explore/donor', async(req, res) => {
    const { userId } = req.session;
    try {
      const foundDonor = await Donor.find({}).exec();
      return res.render('explore/donor', { donors: foundDonor, user: userId });
    } catch(err) {
      return res.redirect('explore/donor');
    }
  });
}
