
const controller = require('../../controllers/subscription.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');
module.exports = (app) => {
  app.get('/subscriptions', validateToken, resolve(controller.getSubscription));
};
