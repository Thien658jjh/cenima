module.exports = (app) => {
    let uploadController = require('../controllers/uploadController'),
        config = require('../config/config').CONFIG_API

    // Route get, post, put...
    app.route('/upload')
        .post(uploadController.uploadImage)
}