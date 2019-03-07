const expressMiddleWares = require('./expressMiddleWares');

module.exports = (express, app) => {
  expressMiddleWares(express, app);
}
