let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	storyModel = new Schema({
		iddb: {
			type: Schema.Types.ObjectId,
			default: Schema.Types.ObjectId
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
		},
		storyVietNam: {
			type: String,
			default: ""
		},
		vocabs: {
			type: [],
			default: [{ "idVocab": "", "vocabWord": "", "vocabMeaning": "", "phonemic": "" }]
		},
		idioms: {
			type: [],
			default: [{ "idIdiom": "", "idiomSentence": "", "idiomMeaning": "" }]
		}
	})

module.exports = mongoose.model('storyModel', storyModel)