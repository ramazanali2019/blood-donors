const express = require('express'),
      app = express(),
      config = require('./config'),
      { rootRoute, exploreRoute, aboutRoute, loginRoute, registerRoute, profileRoute, patientRoute, logoutRoute } = require('./routes');


app.use(express.static('public'));
config(app);
rootRoute(app);
exploreRoute(app);
aboutRoute(app);
loginRoute(app);
registerRoute(app);
profileRoute(app);
patientRoute(app);
logoutRoute(app);

app.listen(process.env.PORT, () => console.log('Server is running...'));
