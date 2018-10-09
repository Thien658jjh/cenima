let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	storyFunnyModel = new Schema({
		storyTime: {
			type: Number,
			default: Date.now()
		},
		categoryName: {
			type: String,
			default: "Others"
		},
		storyName: {
			type: String,
			default: "",
			require
		},
		storyOriginal: {
			type: String,
			default: "",
			require
		}
	})

module.exports = mongoose.model('storyFunnyModel', storyFunnyModel)