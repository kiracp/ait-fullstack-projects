var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ 'defaultLayout':'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get('/', function(req, res){
	res.render('index', {header: 'Browser test page', headers: req.headers}); 
	console.log(req.headers);
});


app.get('/about', function(req, res) {
	res.render('about', {header: 'About'}); // Place variables within html
})

app.listen(3000);
console.log('Started server on port 3000');