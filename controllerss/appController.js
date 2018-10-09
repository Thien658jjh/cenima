module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        storyModel = mongoose.model('storyModel'),
        firebase = require('../controllerss/firebaseController').function,
        request = require("request"),
        appRoute = {}

    appRoute.home = (req, res) => {
        res.json({ code: 404, message: 'Error 404 ! Did you lost your way ?? You can walk arround to relax.' })
    }

    appRoute.translate = (req, res) => {
        request('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='
            + req.query.tl
            +'&hl=en-US&dt=t&dt=bd&dj=4&q='
            + req.query.text,
            function (error, response, body) {
                res.json(JSON.parse(body))
            });
    }

    appRoute.uploadnewstory = (req, res) => {
        res.render('uploadstory', {
            layout: 'main-layout',
            title: 'Upload new story'
        })
    }

    appRoute.uploadnewfunnystory = (req, res) => {
        res.render('uploadfunnystory', {
            layout: 'layoutphp',
            title: 'Upload new story'
        })
    }

    appRoute.uploadnewquotation = (req, res) => {
        res.render('newquotation', {
            layout: 'main-layout',
            title: 'Upload new story'
        })
    }


    return appRoute
})()
