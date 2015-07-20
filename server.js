var express = require('express'),
	underscore = require('underscore'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/productivity-app");

app.listen(process.env.PORT || 3000);
