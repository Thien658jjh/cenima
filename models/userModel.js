var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userModel = new Schema({
        userName: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        photo: {
            type: String,
            default: "./images/default.svg"
        },
        timeCreate: {
            type: Number,
            default: Date.now,
        },
        timeModified: {
            type: Number,
            default: Date.now
        },
        accessToken: {
            type: String,
            default: null
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    })

module.exports = mongoose.model('userModel', userModel)    
