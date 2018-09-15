module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        uuidv4 = require('uuid/v4'),
        storyModel = mongoose.model('storyModel'),
        idiomModel = mongoose.model('idiomModel'),
        vocabModel = mongoose.model('vocabModel'),
        appRoute = {}

    appRoute.getStory = (req, res) => {
        if (func.__check_header_secret_key(req.query.secret)
            && req.query.offset) {
            storyModel.find()
                .limit(15)
                .skip(parseInt(req.query.offset))
                .exec(function (err, result) {
                    if (result) {
                        res.status(200).json({
                            code: 200,
                            stories: result
                        })
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

    // User register    
    appRoute.createNewStory = (req, res) => {
        require('getmac').getMac(function (err, macAddress) {
            if (err) return res.status(200).json({ code: 403, message: 'Err' })
            else
                if (!func.isEmpty(req.body)
                    && req.body.storyName
                    && req.body.storyNameVN
                    && req.body.storyOriginal
                    && req.body.storyVietNam
                    && req.body.vocabs
                    && req.body.idioms) {
                    if (func.__verify_keyupload(req.body.keyupload) | func.__verify_mac_address(macAddress)) {
                        storyModel.find({ storyName: req.body.storyName }, (error, result) => {
                            if (error) {
                                res.status(200).json({
                                    code: 403, message: 'Failed'
                                })
                            } else {
                                if (!result.length) {
                                    new storyModel({
                                        storyName: req.body.storyName,
                                        storyNameVN: req.body.storyNameVN,
                                        storyOriginal: req.body.storyOriginal,
                                        storyVietNam: req.body.storyVietNam,
                                        storyNumber: req.body.storyNumber,
                                        thumbUrl: req.body.thumbUrl,
                                        vocabs: req.body.vocabs,
                                        idioms: req.body.idioms
                                    }).save((err, data) => {
                                        if (err) {
                                            res.status(200).json({
                                                code: 400, message: 'Account registration failed' + err
                                            })
                                        } else {
                                            res.status(200).json({
                                                code: 200, message: 'Add new story successful',
                                                data: data
                                            })
                                        }
                                    })
                                } else {
                                    res.status(200).json({ code: 400, message: 'Already exists' })
                                }
                            }
                        })
                    } else {
                        res.status(200).json({ code: 403, message: 'The request is understood, but have somethings wrong !!' + macAddress })
                    }
                } else {
                    res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
                }
        })
    }

    return appRoute
})()
