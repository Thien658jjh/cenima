module.exports = (app) => {
    let userController = require('../controllers/userController'),
        appController = require('../controllers/appController'),
        config = require('../config/config').CONFIG_API

    // Route get, post, put...
    app.route(config.__link_user)
        .get(userController.getUser)
        .post(userController.createUser)

    app.route(config.__link_user_login)
        .get(appController.login)
        .post(userController.loginUser)

    app.route('/profile/changepass')
        .post(userController.changePass)

}