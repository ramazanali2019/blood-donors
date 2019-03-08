const { User, Donor, Patient } = require('../models'),
      { isAuthenticate } = require('../middlewares');

module.exports = app => {
  app.get('/patient', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const patient = await Patient.find({userId: user});
    if(patient) {
      res.render('patient/', { user, patient });
    } else {
      res.render('patient/', { user, patient });
    }
  });

  app.get('/patient/new', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const donor = await Donor.findOne({ userId: user });
    res.render('patient/new', { user, donor });
  });

  app.post('/patient/new/:id', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const { id } = req.params;
    const { userId, firstName, middleName, lastName, age, place, state, country, bloodGroup, phone, problem, units, type, requiredDate, contactInfo  } = req.body;
    const newPatient = await Patient.create({
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
      problem,
      units,
      type,
      requiredDate,
      contactInfo,
      solved: false
    })
    return res.redirect('/patient');
  });

  app.get('/patient/edit/:id', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const { id } = req.params;
    const patient = await Patient.findById(id);
    res.render('patient/edit', { user, patient });
  });

  app.post('/patient/edit/:id', isAuthenticate, async(req, res) => {
    const { userId: user } = req;
    const { id } = req.params;
    const { userId, firstName, middleName, lastName, age, place, state, country, bloodGroup, phone, problem, units, type, requiredDate, contactInfo, solved } = req.body;
    console.log(requiredDate);
    const updatedPatient = await Patient.replaceOne({ _id: id }, {
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
      problem,
      units,
      type,
      requiredDate,
      contactInfo,
      solved
    });
    return res.redirect('/patient');
  });

  app.get('/patient/remove/:id', isAuthenticate, async(req, res) => {
    const { id } = req.params;
    await Patient.deleteOne({ _id: id });
    res.redirect('/patient');
  });

  app.get('/patient/:id', async(req, res) => {
    const { userId: user } = req.session;
    const { id } = req.params;
    const patient = await Patient.findById(id).populate('request').exec();
    res.render('patient/patient', { user, patient });
  });

  app.get('/patient/:patientId/donate', isAuthenticate, async(req, res) => {
    const { userId: user } = req.session;
    const { patientId } = req.params;
    const donor = await Donor.findOne({ userId: user });
    if(donor) {
      const patient = await Patient.findById(patientId);
      patient.request.push(donor.id);
      const updatedPatient = await patient.save();
      res.redirect(`/patient/${patientId}`);
    } else {
      return res.redirect(`/patient/${patientId}`);
    }
  });

  app.get('/patient/:patientId/accept', isAuthenticate, async(req, res) => {
    const { userId: user } = req.session;
    const { patientId } = req.params;
    const patient = await Patient.updateOne({ _id: patientId }, { solved: true }).populate('request');
    console.log(patient);
    res.redirect(`/patient/${patientId}`);
  });

  app.get('/patient/:patientId/reject', (req, res) => {
    res.send('Rejected');
  });
}
