var express = require('express'),
	underscore = require('underscore'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var app = express();

mongoose.connect(
  	process.env.MONGOLAB_URI ||
  	process.env.MONGOHQ_URL ||
	"mongodb://localhost/productivity-app");

app.get(‘/’, function(req, res){
	var index = __dirname + ‘public/index.html’;
	res.sendFile(index)
}

app.listen(process.env.PORT || 3000);
