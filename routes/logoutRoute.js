module.exports = app => {
  app.get('/logout', async(req, res) => {
    console.log('Logout Route');
    try {
      await req.session.destroy;
      res.clearCookie('pid');
      return res.redirect('/login');
    } catch(e) {
      return res.redirect('/');
    }
  });
}
