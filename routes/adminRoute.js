module.exports = (app) => {
    var adminController = require('../controllers/adminController'),
        config = require('../config/config').CONFIG_API

    // Route get, post, put...
    app.route(config.__link_admin)
        .get(adminController.adminPanel)

        
    app.route(config.__link_admin_2)
    .get(adminController.visit)
}