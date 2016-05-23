var mongoose = require('mongoose');

// My lovely schema!
var Movie = mongoose.Schema({
  title: String, 
  director: String,
  year: Number,
})

// Register model
mongoose.model('Movie', Movie);

mongoose.connect('mongodb://localhost/hw05');
