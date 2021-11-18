
const controller = require('../../controllers/claims.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');

module.exports = (app) => {
  app.get('/claims', validateToken, resolve(controller.getClaims));
  app.post('/claim', validateToken, resolve(controller.createClaim));
  app.put('/claim/:id', validateToken, resolve(controller.updateClaim));
  app.put('/claim/status/:id', validateToken, resolve(controller.updateClaimStatus));
  app.delete('/claim/:id', validateToken, resolve(controller.deleteClaim));
};

