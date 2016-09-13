var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

	title: {
		type: String,
		required: true
	},

	link: [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
});

var article = mongoose.model('article', ArticleSchema);

module.exports = article;