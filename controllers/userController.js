module.exports = (() => {
    var func = require('./function').function,
        mongoose = require('mongoose'),
        userModel = mongoose.model('userModel'),
        userRoute = {},
        bcrypt = require('bcrypt-nodejs'),

        // Generate password
        __generate_password = (callback, password) => {
            bcrypt.hash(password, null, null, (err, hash) => {
                callback(hash)
            })
        },

        __update_password = (callback, req) => {
            let __encrypt_password = (hash) => {
                userModel.findByIdAndUpdate({
                    _id: req.id
                }, {
                        password: hash
                    }, {
                        upsert: true,
                        new: true
                    }).exec((err, new_user) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(200)
                        }
                    })
            }
            __generate_password(__encrypt_password, req.newpass)
        }

    userRoute.createUser = (req, res) => {
        if (!func.isEmpty(req.body)) {
            userModel.find({ email: req.body.email }, (error, result) => {
                if (result[0] === undefined) {
                    let __encrypt_password = (hash) => {
                        new userModel({
                            userName: req.body.userName,
                            detail: req.body.detail,
                            photo: req.body.photo,
                            password: hash,
                            isAdmin: false,
                            email: req.body.email,
                            reset_password_token: func.__generate_reset_password_token(),
                            accessToken: func.__generate_access_token({
                                userName: req.body.userName,
                                detail: req.body.detail,
                                photo: req.body.photo
                            })
                        }).save((err, data) => {
                            if (err) {
                                res.status(200).json({ code: 400, message: "Create new user failed !" })
                            } else {
                                res.status(200).json({
                                    code: 200, message: "Create new user successfully !",
                                    user: data
                                })
                            }
                        })
                    }
                    __generate_password(__encrypt_password, req.body.password)
                } else {
                    res.status(200).json({ code: 400, message: 'Email address already exists' })
                }
            })
        } else {
            res.status(200).json({ code: 400, message: 'I cant regist your account !' })
        }
    }

    // User Login
    userRoute.loginUser = (req, res) => {
        if (!func.isEmpty(req.body)) {
            userModel.findOne({ email: req.body.email }, (err, data) => {

                if (data) {
                    // Check password
                    console.log("Have data ")
                    if (func.__verify_password(req.body.password, data.password)) {
                        res.status(200).json({
                            code: 200,
                            message: "Login successfully !",
                            _id: data._id,
                            email: data.email,
                            userName: data.userName,
                            accessToken: data.accessToken,
                        })
                    } else {
                        res.status(200).json({ code: 400, message: 'User or password is not correct !' })
                        return
                    }
                } else {
                    res.status(200).json({ code: 404, message: 'The email does not exist' })
                    console.log("Empty ")
                    return
                }
            })
        } else {
            res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
        }
    }

    userRoute.getUser = (req, res) => {
        if (!func.isEmpty(req.query.id)) {
            userModel.findOne({ _id: req.query.id }, (err, data) => {
                if (data == null) { // The email does not exist
                    res.status(404).json({ code: 404, message: 'User is not exist s ' + req.query.id + ' sd ' })
                } else if (data) {
                    res.status(200).json({
                        status: 200,
                        _id: data._id,
                        userName: data.userName,
                        email: data.email,
                        photo: data.photo,
                        phone: data.phone,
                        timeCreate: data.timeCreate
                    })
                } else {
                    res.status(200).json({ code: 403, message: 'User is not found' })
                }
            })
        } else {
            res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
        }
    }



    // Update information
    userRoute.updateinformation = (req, res) => {
        if (!func.isEmpty(req.body)) {
            userModel.findByIdAndUpdate({
                _id: req.body._id
            }, {
                    userName: req.body.userName,
                    photo: req.body.photo,
                    email: req.body.email,
                    timeModified: Date.now()
                }, {
                    upsert: true,
                    new: true
                }).exec((err, new_user) => {
                    res.status(200).json({ code: 200, message: 'Update account information successfully' })
                })

        } else {
            res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
        }
    }
    // Update information
    userRoute.changePass = (req, res) => {
        if (!func.isEmpty(req.body)) {
            userModel.findOne({ _id: req.body.id }, (err, result) => {
                if (result) {
                    // res.status(200).json({ code: 404, message: 'User not fsdound !' + result.id })
                    if (func.__verify_password(req.body.oldpass, result.password)) {
                        let get_return = (ress) => {
                            if (ress == 200) {
                                res.status(200).json({ code: 200, message: 'Change password successfully !' })
                            } else {
                                res.status(200).json({ code: 301, message: "Change password failed" })
                            }
                        }
                        __update_password(get_return, req.body)
                    } else {
                        res.status(200).json({ code: 301, message: 'Old password is not correct !' })
                    }
                } else {
                    res.status(200).json({ code: 301, message: 'User is not found' })
                }
            })
        } else {
            res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
        }
    }

    return userRoute

})()