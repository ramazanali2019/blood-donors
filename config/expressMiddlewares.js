const bodyParser = require('body-parser'),
      session = require('express-session'),
      mongoose = require('mongoose');

module.exports = app => {
  require('dotenv').config();
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    name: 'pid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2
    }
  }));
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  });
}
