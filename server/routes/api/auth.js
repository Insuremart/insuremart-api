
const controller = require('../../controllers/auth.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');

module.exports = (app) => {
  app.post('/signup',  resolve(controller.signup)); 
  app.post('/login', resolve(controller.login)); 
  app.post('/change-password', resolve(controller.changePassword)); 

  app.get('/me', validateToken, resolve(controller.me)); 
  app.get('/profile/:id', validateToken, resolve(controller.getProfile)); 
  app.put('/profile', validateToken, resolve(controller.updateProfile)); 
  app.put('/updateProfileImage', validateToken, resolve(controller.updateProfileImage));
};
