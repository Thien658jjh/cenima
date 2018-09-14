module.exports = (app) => {
    var categpryController = require('../controllers/categoryController'),
        config = require('../config/config').CONFIG_API

    // Route get, post, put...
    app.route('/' + config.__link_category)
        .post(categpryController.createCategory)
}