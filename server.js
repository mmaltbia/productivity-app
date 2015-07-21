var express = require('express'),
	underscore = require('underscore'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var app = express();

//serve js and css files
app.use(express.static(__dirname + 'views/public'));

mongoose.connect(
  	process.env.MONGOLAB_URI ||
  	process.env.MONGOHQ_URL ||
	"mongodb://localhost/productivity-app");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html')
});

app.listen(process.env.PORT || 3000);
