
// const controller = require('../../controllers/settings.controller');
const { validateToken } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');
module.exports = (app) => { 
  app.get('/policy_cover/fetch/all', validateToken, () => {});
  app.get('/policy_cover/add', validateToken, () => {});
};
