var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    filmModel = new Schema({
        filmName: {
            type: String,
            default: ""
        },
        categoryId: {
            type: String,
            default: ""
        },
        ownerId: {
            type: String,
            default: ""
        },
        categoryName: {
            type: String,
            default: ""
        },
        timeOpen: {
            type: String,
            default: ""
        },
        month: {
            type: String,
            default: "1"
        },
        year: {
            type: String,
            default: ""
        },
        detail: {
            type: String,
            default: ""
        },
        photo: {
            type: String,
            default: "./images/no-image.jpg"
        },
        timeCreate: {
            type: Number,
            default: Date.now
        },
        timeModified: {
            type: Number,
            default: Date.now
        }
    })

module.exports = mongoose.model('filmModel', filmModel)    
