// Project setup
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var handlebars = require('express-handlebars') 
	.create({ defaultLayout:'main' });
var app = express();

var publicPath = path.resolve(__dirname, "public");

var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession(sessionOptions));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// Function for logging out info
function logging(req, path){
	console.log("\n", req.method, req.url);
	console.log("=====");
	console.log("req.body: ", req.body);
	console.log("req.session.minVal: ", req.session.minVal);
}

// Initialize and populate birds array
var birds = [];
birds.push({'name': 'Bald Eagle', 'sightings': 3});
birds.push({'name': 'Yellow Billed Duck', 'sightings': 7});
birds.push({'name': 'Great Cormorant', 'sightings': 4});

// Home page
app.get('/', function(req, res){
	res.render('home'); 
	logging(req, path);
});

// Birds
app.get('/birds', function(req, res){
	// Default minval is 0, but can be set
	var minVal = 0;

	if (req.session.minVal){
		minVal = req.session.minVal;
	}
	
	// Filter array and set equal to global
	var filterBirds = [];
	birds.filter(function(ele){
		if (ele.sightings >= minVal) {
			filterBirds.push(ele);
		}
	});

	// Set filtered list to session variable
	req.session.yourMinimumValueVariable = filterBirds;

	// Send filtered list to be rendered
	req.birds = filterBirds;
	res.render('birds', {birds:req.birds}); 
	logging(req, path);
});

app.post('/birds', function (req,res) {
	// Set input body to bird
	var bird = req.body.bird;
	var found = false;

	// Check to see if bird is already in array
	var index = birds.filter(function(ele) {
		if (ele.name === bird){
			found = true;
			return ele;
		}
	});

	// If yes, then update sightings number
	if (found){
		index[0].sightings = index[0].sightings+1; // funkiness
		res.redirect('/birds');
		logging(req, path);
	}

	// Else, add new bird to array
	else {
		var newBird = {'name': bird, 'sightings': 1};
		birds.push(newBird);
		res.redirect('/birds');
		logging(req, path);
	}
});

        	
          <!-- alt="bagel1" align="center" width="35%" height="35%" hspace="20"-->


// Settings
app.get('/settings', function(req, res){
	// Passing in minVal to prefill form
	res.render('settings', {minVal:req.session.minVal}); 
	logging(req, path);
});

app.post('/settings', function(req, res){
	// Add new minval from body
	var minVal = req.body.minVal;
	req.session.minVal = minVal;

	res.render('settings', {minVal:req.session.minVal}); 
	logging(req, path);
});

// Start it uppp!
app.listen(3000);
console.log("Started server on port 3000");
