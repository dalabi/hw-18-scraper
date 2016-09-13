//dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();
//Scraping tools
var request = require('request');
var cheerio = require('cheerio');

//make public a static directory
app.use(express.static('public'));

//Database configuration with mongoose
mongoose.connect('mongodb://localhost/hw18db');
var db = mongoose.connection;

//show any mongoose errors
db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

//show if db connection successful
db.once('open', function() {
	console.log('Mongoose connection successful.');
});

//requiring models
var comment = require('./models/comment.js');
var article = require('./models/article.js');

//Routes:

//Index route
app.get('/scrape', function(req, res) {
	request('http://phonearena.com', function (err, res, html) {
		if (err) {
			throw err;
		}

		var $ = cheerio.load(html);

		var results = [];

		$('.ln-item.left.article_home').each(function(i, element) {

			var content = $(element).text();

			var link = $(element).find('a').first().attr('href');

				results.push({
					title: content,
					link: link
				});
		});
	console.log('HERE ARE YOUR RESULTS',results);
	});
	res.send('Finished Scraping');
});

app.get('/articles', function(req, res){
	Article.find({}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		else{
			res.json(doc);
		}
	});
});

app.get('/articles/:id', function (req, res) {
	Article.findOne({'_id': req.params.id}).populate('note').exec(function(err, doc){
		if (err) {
			console.log(err);
		}
		else {
			res.json(doc);
		}
	});
});

app.post('/articles/:id', function(req, res){
	var newNote = new Note(req.body);

	newNote.save(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id}).exec(function(err, doc){
				if (err){
					console.log(err);
				}else {
					res.send(doc);
				}
			});
		}
	});
});

app.listen(8000, function() {
	console.log('App running on port 8000!');
});
