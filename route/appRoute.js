module.exports = (app) => {
    let appController = require('../controllerss/appController'),
        config = require('../config/apiConfig').CONFIG_API

    // Route get, post, put...
    app.route('/')
        .get(appController.home)
        
    app.route('/translate')
    .get(appController.translate)
    

    app.route(config.__link_upload_new_story)
        .get(appController.uploadnewstory)
        
    app.route(config.__link_upload_new_funny_story)
    .get(appController.uploadnewfunnystory)

    app.route(config.__link_upload_new_quotation)
    .get(appController.uploadnewquotation)

}