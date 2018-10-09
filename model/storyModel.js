let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	storyModel = new Schema({
		storyTime: {
			type: Number,
			default: Date.now()
		},
		storyName: {
			type: String,
			default: "",
			require
		},
		storyNumber: {
			type: Number,
			default: -1
		},
		thumbUrl: {
			type: String,
			default: "",
		},
		storyNameVN: {
			type: String,
			default: "",
			require
		},
		storyOriginal: {
			type: String,
			default: "",
			require
		},
		storyVietNam: {
			type: String,
			default: ""
		},
		vocabs: {
			type: [],
			default: [{ "idVocab": "", "vocabWord": "", "vocabType": "", "vocabMeaning": "", "phonemic": "" }]
		},
		idioms: {
			type: [],
			default: [{ "idIdiom": "", "idiomSentence": "", "idiomMeaning": "" }]
		}
	})

module.exports = mongoose.model('storyModel', storyModel)