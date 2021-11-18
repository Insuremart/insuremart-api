
const controller = require('../../controllers/reporting');
const { resolve } = require('../../lib/http');
module.exports = (app) => {
  app.post('/report/error', controller.errorLogging); 
  app.post('/report/interaction', controller.interaction); 
};
