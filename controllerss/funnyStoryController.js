module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        firebase = require('./firebaseController').function,
        uuidv4 = require('uuid/v4'),
        storyFunnyModel = mongoose.model('storyFunnyModel'),
        appRoute = {}


    appRoute.newFunnyStory = (req, res) => {
        firebase.newFunnyStory(req.body, resu => {
            if (!resu) {
                res.status(200).json({ code: 200, message: 'Saved' })
            } else {
                res.status(200).json({ code: 403, message: 'Failed' })
            }
        })
    }

    return appRoute;
})()