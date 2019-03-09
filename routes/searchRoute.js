const { Donor } = require('../models');

module.exports = app => {
  app.get('/search', async(req, res) => {
    const { userId: user } = req.session;
    const { bloodGroup, location } = req.query;
    const queryParam = {bloodGroup, location};
    const donors = await Donor.find({'profile.bloodGroup': `${bloodGroup}`, 'profile.location.place': { $in: `${location}` }});
    // const donors = await Donor.find({$text: {$search: 'Dhaka'}});
    console.log(donors);
    res.render('search', { user, queryParam, donors });
  });

  app.post('/search', (req, res) => {
    const { location, bloodGroup } = req.body;
    if(!location || !bloodGroup) {
      return res.redirect('/');
    }
    return res.redirect(`/search?bloodGroup=${bloodGroup}&location=${location}`);
  });
}
