const expressMiddleWares = require('./expressMiddleWares');

module.exports = app => {
  expressMiddleWares(app);
}
