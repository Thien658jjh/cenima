module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        firebase = require('./firebaseController').function,
        uuidv4 = require('uuid/v4'),
        storyModel = mongoose.model('storyModel'),
        idiomModel = mongoose.model('idiomModel'),
        vocabModel = mongoose.model('vocabModel'),
        appRoute = {}

    appRoute.getStory = (req, res) => {
        var a = new Array();
        if (func.__check_header_secret_key(req.query.secret)
            && req.query.offset) {
            storyModel.find()
                .limit(1)
                .skip(parseInt(req.query.offset))
                .exec(function (err, result) {
                    if (result) {

                    } else {
                        res.status(200).json({ code: 403, message: 'Loi !!' + err })
                    }
                })
        } else {
            res.status(200).json({ code: 403, message: 'Getting failed' })
        }

    }

    appRoute.deleteStory = (req, res) => {
        if (func.__check_header_secret_key(req.query.secret)) {
            storyModel.remove({ iddb: req.query.iddb }, (err) => {
                if (err) {
                    res.status(200).json({
                        code: 403,
                        stories: "Failed"
                    })
                } else {
                    res.status(200).json({ code: 403, message: 'Deleted' })
                }
            })
        } else {
            res.status(200).json({ code: 403, message: 'Deleting failed' })
        }
    }

    appRoute.deleteAllStory = (req, res) => {
        if (func.__check_header_secret_key(req.query.secret)) {
            storyModel.remove({}, (err) => {
                if (err) {
                    res.status(200).json({
                        code: 403,
                        stories: "Failed"
                    })
                } else {
                    res.status(200).json({ code: 403, message: 'Deleted' })
                }
            })
        } else {
            res.status(200).json({ code: 403, message: 'Deleting failed' })
        }
    }

    appRoute.newQuotation = (req, res) => {

        firebase.newQuotation(req.body, res)
    }

    // Use this to coppy all data from mLab to FireBase
    // Use to backup from A -> B
    appRoute.lenlale = (req, res) => {
        firebase.backup(req.body.resr, res)
    }


    // create New story  
    appRoute.createNewStory = (req, res) => {
        require('getmac').getMac(function (err, macAddress) {
            if (!func.isEmpty(req.body)
                && req.body.storyName
                && req.body.storyNameVN
                && req.body.storyOriginal
                && req.body.storyVietNam
                && req.body.vocabs
                && req.body.idioms) {
                if (func.__verify_keyupload(req.body.keyupload) | func.__verify_mac_address(macAddress)) {

                    // Alse saving to mLab
                    new storyModel({
                        storyName: req.body.storyName,
                        storyNameVN: req.body.storyNameVN,
                        storyOriginal: req.body.storyOriginal,
                        storyVietNam: req.body.storyVietNam,
                        storyNumber: req.body.storyNumber,
                        thumbUrl: req.body.thumbUrl,
                        vocabs: req.body.vocabs,
                        idioms: req.body.idioms,
                    }).save((err, data) => {
                        if (err) {
                            res.status(200).json({ code: 403, message: 'Failed' })
                        } else {
                            firebase.newStory(req.body, resu => {
                                if (!resu) {
                                    res.status(200).json({ code: 200, message: 'Saved' })
                                } else {
                                    res.status(200).json({ code: 403, message: 'Failed' })
                                }
                            })
                        }
                    })
                } else {
                    res.status(200).json({ code: 403, message: 'The request is understood, but have somethings wrong !!' })
                }
            }
        })

    }

    return appRoute
})()
