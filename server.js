var express = require('express'),
	underscore = require('underscore'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	richText = require('./lib/type');;
	angular = require('./angular');

var app = express();

//serve js and css files
app.use(express.static(__dirname + '/public'));

mongoose.connect(
  	process.env.MONGOLAB_URI ||
  	process.env.MONGOHQ_URL ||
	"mongodb://localhost/productivity-app");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
});

app.listen(process.env.PORT || 3000);
