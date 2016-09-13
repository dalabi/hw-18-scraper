var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

	title:{
		type: String
	},

	body:{
		type: String
	},
});

var comment = mongoose.model('comment', CommentSchema);

module.exports = comment;