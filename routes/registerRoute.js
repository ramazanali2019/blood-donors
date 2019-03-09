const bcrypt = require('bcrypt'),
      { User } = require('../models');

module.exports = app => {
  app.get('/register', (req, res) => {
    const { userId: user } = req.session;
    res.render('auth/register', { user, alert: req.flash('info') });
  });

  app.post('/register', async(req, res) => {
    let { body } = req;
    const { username, email, password } = body;
    const foundUser = await User.findOne({ username });
    if(!foundUser) {
      bcrypt.hash(body.password, 12, async(err, hash) => {
        if(err) {
          req.flash('info', 'Something went wrong!')
          return res.redirect('/register');
        } else {
          body.password = hash;
          const newUser = await User.create(body);
          req.session.userId = newUser._id;
          return res.redirect('/');
        }
      });
    } else {
      req.flash('info', 'User already Exist!')
      return res.redirect('/login');
    }
  });
}
