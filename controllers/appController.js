module.exports = (() => {
    mongoose = require('mongoose'),
        filmModel = mongoose.model('filmModel'),
        appRoute = {}

    appRoute.home = (req, res) => {
        res.render('listfilm', {
            layout: 'template-layout',
            message: "defaultmess",
            title: 'Dashboard',
        })
    }

    appRoute.upfilm = (req, res) => {
        res.render('upfilm', {
            layout: 'template-layout',
            title: 'Upload new film'
        })
    }


    appRoute.editFilm = (req, res) => {
        res.render('film-edit', {
            layout: 'template-layout',
            title: 'Film detail'
        })
    }

    appRoute.filmDetail = (req, res) => {
        res.render('film-detail', {
            layout: 'template-layout',
            title: 'Film detail'
        })
    }
    appRoute.login = (req, res) => {
        res.render('login', {
            layout: 'template-layout',
            title: 'Login'
        })
    }

    appRoute.register = (req, res) => {
        res.render('register', {
            layout: 'template-layout',
            title: 'Register'
        })
    }

    appRoute.auth = (req, res) => {
        res.render('profile', {
            layout: 'template-layout',
            title: 'User profile'
        })
    }

    appRoute.changepass = (req, res) => {
        res.render('profile-change-pass', {
            layout: 'template-layout',
            title: 'Change password'
        })
    }

    return appRoute
})()
