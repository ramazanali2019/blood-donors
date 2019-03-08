const { User, Patient, Donor } = require('../models'),
      { isAuthenticate } = require('../middlewares');

module.exports = app => {
  app.get('/profile', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const donor = await Donor.findOne({userId: user});
    if(donor) {
      const patient = await Patient.find({'profile.bloodGroup': donor.profile.bloodGroup});
      res.render('profile/', { user, donor, patient });
    } else {
      res.render('profile/', { user, donor });
    }
  });

  app.get('/profile/new', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    res.render('profile/new', { user });
  });

  app.post('/profile/new/:id', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const { id } = req.params;
    const { userId, firstName, middleName, lastName, age, place, state, country, bloodGroup, phone, donatedOnce, lastDonated, smoke } = req.body;
    const newDonor = await Donor.create({
      userId: user,
      profile: {
        firstName,
        middleName,
        lastName,
        age,
        location: {
          place,
          state,
          country
        },
        bloodGroup,
        phone
      },
      donatedOnce,
      lastDonated,
      smoke
    });
    return res.redirect('/profile');
  });

  app.get('/profile/edit/:id', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const { id } = req.params;
    const profile = await Donor.findById(id);
    res.render('profile/edit', { user, profile });
  });

  app.post('/profile/edit/:id', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const { id } = req.params;
    const { userId, firstName, middleName, lastName, age, place, state, country, bloodGroup, phone, donatedOnce, lastDonated, smoke } = req.body;
    console.log(req.body);
    const newDonor = await Donor.replaceOne({ userId: id }, {
      userId: user,
      profile: {
        firstName,
        middleName,
        lastName,
        age,
        location: {
          place,
          state,
          country
        },
        bloodGroup,
        phone
      },
      donatedOnce,
      lastDonated,
      smoke
    });
    return res.redirect('/profile');
  });
}
