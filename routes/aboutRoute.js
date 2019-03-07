module.exports = app => {
  app.get('/about', (req, res) => {
    const { userId: user } = req.session;
    res.render('about', { user });
  });
}
