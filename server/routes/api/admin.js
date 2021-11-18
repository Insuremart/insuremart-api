const controller = require('../../controllers/admin.controller');
const { validateToken, validateAdmin } = require('../../middlewares/auth');
const { resolve } = require('../../lib/http');

module.exports = (app) => {
    app.post('/admin/motor/extension', validateToken, resolve(controller.addExtension));
    app.put('/admin/motor/extension/:id', validateToken, resolve(controller.editExtension));

    app.post('/admin/motor/policy', validateToken, resolve(controller.addPolicyCover));
    app.put('/admin/motor/policy/:id', validateToken, resolve(controller.editPolicyCover));


    app.get('/admin/companies', validateToken, resolve(controller.getCompanies));
    app.post('/admin/company', validateToken, resolve(controller.addCompany));
    app.put('/admin/company/:id', validateToken, resolve(controller.editCompany));
    app.delete('/admin/company/:id', validateToken, resolve(controller.deleteCompany));
};
