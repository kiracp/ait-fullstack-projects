var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//module.exports = router;

/* 
Three pages:
/list
/list/create
/list/name-of-list
*/

// All lists
router.get('/list', function (req, res) {
	res.render('list', {title: 'Shoppy Shoperson'});
	List.find({}, function(err, lists, count) {
		res.send(lists);
	});

});

router.get('/list:slug');

// Create form
router.get('/list/create', function (req,res) {
	res.render('list-create');
});

router.post('/list/create', function (req,res) {
	// create new pizza object
	var l = new List({
	  name:req.body.name,
	  createdBy:req.body.createdBy
	})

	// Call save to actually store in database
	l.save(function(err, list, count) {
		// Do stuff
		res.redirect(303, '/list');
	});
	
});

module.exports = router;