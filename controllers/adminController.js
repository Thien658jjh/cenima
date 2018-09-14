module.exports = (() => {
    var func = require('./function').function,
        mongoose = require('mongoose'),
        defaultmess = 'Welcome to dashboard',
        adminRoute = {}

    adminRoute.adminPanel = (req, res) => {
        res.send({ ok: "sai nữa đi" })
    }

    adminRoute.visit = (req, res) => {
        res.send({ ok: "sai nữa đi" })
    }

    return adminRoute

})()