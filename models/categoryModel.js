var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    categoryModel = new Schema({
        category_id: {
            type: Schema.Types.ObjectId,
            default: null
        },
        category_name: {
            type: String,
            default: ""
        },
        detail: {
            type: String,
            default: ""
        },
        photo: {
            type: String,
            default: ""
        },
        time_create: {
            type: Number,
            default: Date.now
        }
    })

module.exports = mongoose.model('categoryModel', categoryModel)    
