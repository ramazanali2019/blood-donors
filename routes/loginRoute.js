const { User } = require('../models'),
      bcrypt = require('bcrypt');

module.exports = app => {
  app.get('/login', (req, res) => {
    const { user } = req;
    res.render('auth/login', { user, alert: req.flash('info') });
  });

  app.post('/login', async(req, res) => {
    let { body } = req;
    const { username, password } = body;
    try {
      const foundUser = await User.findOne({ username });
      if(foundUser) {
        const hash = await bcrypt.compare(password, foundUser.password);
        if(hash) {
          req.session.userId = foundUser._id;
          return res.redirect('/');
        } else {
          req.flash('info', 'Invalid Information!')
          return res.redirect('/login');
        }
      } else {
        req.flash('info', 'User not found!')
        return res.redirect('/register');
      }
    } catch(err) {
      req.flash('info', 'Something went wrong!')
      return res.redirect('/login');
    }
  });
}
