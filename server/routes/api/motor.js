
const controller = require('../../controllers/motor.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');

module.exports = (app) => {
  app.get('/motor/policy/:id', validateToken, resolve(controller.createMotorPolicy));
  app.get('/motor/policy/all', validateToken, () => {});
  app.post('/motor/policy/summary', validateToken, () => {});  
  app.post('/motor/policy/new', validateToken, resolve(controller.createMotorPolicy));
  app.post('/motor/policy/renewal', validateToken, () => {});
  
  app.get('/motor/extensions', validateToken, () => {});
  

  app.get('/motor/rates', validateToken, () => {});
};