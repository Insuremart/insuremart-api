
const controller = require('../../controllers/motor.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');
module.exports = (app) => {
  app.get('/partners', validateToken, () => {});
  app.post('/partner', validateToken, () => {});
};

