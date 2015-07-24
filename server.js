var express = require('express'),
	underscore = require('underscore'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	Project = require('./models/projects.js'),
	User = require('./models/users.js'),
	Notes = require('./models/notes.js'),
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10),
	session = require('express-session'),
 	app = express();

//serve js and css files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// configure session
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET || require('./config').SESSION_SECRET,
  cookie: { maxAge: 60000 }
}));

// Middleware

app.use('/', function (req, res, next) {
 // saves userId in session for logged-in user
 req.login = function (user) {
   req.session.userId = user._id;
 };

 // finds user currently logged in based on `session.userId`
 req.currentUser = function (callback) {
   User.findOne({_id: req.session.userId}, function (err, user) {
     req.user = user;
     callback(null, user);
   });
 };

 // destroy `session.userId` to log out user
 req.logout = function () {
   req.session.userId = null;
   req.user = null;
 };

 next();  // required for middleware
});

// Connect Mongo DB
mongoose.connect(
  	process.env.MONGOLAB_URI ||
  	process.env.MONGOHQ_URL ||
	"mongodb://localhost/productivity-app"
);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html')
});

// PROJECT ROUTES
app.get('/api/projects/:id', function(req, res){
	Project.findOne({"_id": req.params.id}).exec(function(req, project){
		console.log(project);
		res.send(project);
	});
});

app.get('/api/projects', function(req, res){
	Project.find().exec(function(req,projects){
		console.log(projects);

		res.send(projects);
	});
})

//	ADD PROJECTS TO CURRENT USER
app.post('/api/projects', function(req, res){
	console.log(req.body);
	var project = new Project(req.body);
	project.save(function(err, project){
		User.findOne({_id: req.session.userId}).exec(function (err, user) {
			user.projects.push(project);
			user.save();
		});
		res.json(project);
	});
});

//	STICKY NOTES ROUTE
app.post('api/projects/:projectId/notes', function(req, res){
	console.log(req.body);
})

//	SIGNUP/LOGIN ROUTES
app.get('/signup', function(req, res){
	res.sendFile(__dirname + '/public/views/signup.html')
});

app.get('/login', function(req, res){
	res.sendFile(__dirname + '/public/views/login.html');
})

// Create a new user
app.post('/users', function (req, res) {
	console.log('signing up');
  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    console.log(user);
    req.login(user);
    res.redirect('/');
  });
});

//	Login users to their unique profile
app.get('/api/me', function(req, res){
	User.findOne({_id: req.session.userId}).populate('projects').exec(function (err, user) {
	  req.user = user;
	  res.json(user);
	});
})

// authenticate user and set session
app.post('/login', function (req, res) {
	console.log('logging in');
  var userData = {
    email: req.body.email,
    password: req.body.password
  };

  User.authenticate(userData.email, userData.password, function (err, user) {
    if (user){
      req.login(user);
      console.log('logged in:', user);
      res.redirect('/');

      console.log("logged in")
   
    } else {
      // find some way to handle 
      // whatever error came from the authentication code
      res.status(500).send(err);
    }
  });
});

// log out user (destroy session)
app.get('/logout', function (req, res) {
 req.logout();
 res.redirect('/');
});


app.listen(process.env.PORT || 3000); 
