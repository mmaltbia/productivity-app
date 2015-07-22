var express = require('express'),
	underscore = require('underscore'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	Project = require('./models/projects.js'),
 	app = express();

//serve js and css files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
	
mongoose.connect(
  	process.env.MONGOLAB_URI ||
  	process.env.MONGOHQ_URL ||
	"mongodb://localhost/productivity-app");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html')
});

app.get('/api/projects', function(req, res){
	Project.find().exec(function(req,projects){
		res.send(projects);
		console.log(projects);
	});
})

app.post('/api/projects', function(req, res){
	console.log(req.body);
	var project = new Project(req.body);
	project.save(function(err, project){
		res.json(project);
	});
})

app.listen(process.env.PORT || 3000);
