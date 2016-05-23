// Setup
var express = require('express');
var handlebars = require('express-handlebars') 
	.create({ defaultLayout:'main' });
require('./db');
var app = express();

var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Get on movies
app.get('/movies', function(req, res) {
  // If there is a query from the form
  if (req.query.director) {
  	var filter_name = req.query.director;
  	Movie.find({director: filter_name}, function(err, movies, count) {
  		if (movies.length == 0){
	    	res.render('movies', { movies:movies, displaying:"No movies found by: "+filter_name});
  		}
  		else {
	    	res.render('movies', { movies:movies, displaying:"Showing movies directed by: "+filter_name});
	    }
	    console.log(movies);
	});
  }
  // Else, display all
  else {
  	Movie.find({}, function(err, movies, count) {
	    res.render('movies', { movies:movies});
	    console.log(movies);
	});
  }

})

app.listen(3000);
console.log("Server started on port 3000");
