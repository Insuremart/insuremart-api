
const controller = require('../../controllers/payments.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');
module.exports = (app) => {
  app.post('/record-payment', validateToken, controller.recordPayment);
  app.get('/payment/records', validateToken, controller.paymentRecords);
  app.post('/paystack/webhook/url', controller.paystackWebhook);
};
