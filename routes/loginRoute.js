const { User } = require('../models'),
      bcrypt = require('bcrypt');

module.exports = app => {
  app.get('/login', (req, res) => {
    const { user } = req;
    res.render('auth/login', { user });
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
          return res.redirect('/login');
        }
      } else {
        return res.redirect('/login');
      }
    } catch(err) {
      return res.redirect('/login');
    }
  });
}
