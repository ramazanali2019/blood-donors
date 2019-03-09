const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
      { rootRoute, exploreRoute, searchRoute, aboutRoute, loginRoute, registerRoute, profileRoute, patientRoute, logoutRoute } = require('./routes');


app.use(express.static('public'));
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
app.use(flash());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
rootRoute(app);
exploreRoute(app);
searchRoute(app);
aboutRoute(app);
loginRoute(app);
registerRoute(app);
profileRoute(app);
patientRoute(app);
logoutRoute(app);

app.listen(process.env.PORT, () => console.log('Server is running...'));
